const { Order, OrderItem, MenuItem, User, Restaurant } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain items' });
    }

    
    const livreurs = await User.findAll({ where: { role: 'livreur' } });
    const randomLivreur = livreurs.length > 0 ? livreurs[Math.floor(Math.random() * livreurs.length)] : null;

    let totalPrice = 0;
    const orderItemsData = [];

    
    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.menuItemId);
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item ${item.menuItemId} not found` });
      }
      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;
      orderItemsData.push({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        unit_price: menuItem.price,
        total_price: itemTotal
      });
    }

  
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) throw new Error('Restaurant not found');
    
    totalPrice += (restaurant.delivery_fee || 15.00); 

    const order = await Order.create({
      user_id: userId,
      restaurant_id: restaurantId,
      livreur_id: randomLivreur ? randomLivreur.id : null,
      status: 'PENDING',
      total_price: totalPrice,
      delivery_address: deliveryAddress || 'User Default Address', 
      estimated_delivery_time: new Date(Date.now() + 45 * 60000) 
    });


    const createdItems = await OrderItem.bulkCreate(orderItemsData.map(i => ({ ...i, order_id: order.id })));

    res.status(201).json({ message: 'Order created successfully', orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        { model: Restaurant, as: 'restaurant', attributes: ['name', 'image_url'] },
        { model: OrderItem, as: 'items', include: [{ model: MenuItem, as: 'menuItem', attributes: ['name'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
 
  try {
    const { id } = req.params;
    const { status } = req.body;
    
 

    await Order.update({ status }, { where: { id } });
    res.json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};
