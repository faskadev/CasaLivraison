const { User, Restaurant, MenuItem, Order, OrderItem, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); 

    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@casalivraison.ma',
      password: hashedPassword,
      role: 'admin',
      address: 'Casa Port'
    });

    const client1 = await User.create({
      username: 'Youssef',
      email: 'youssef@example.com',
      password: hashedPassword,
      role: 'client',
      address: 'Gauthier',
      phone: '0612345678'
    });

    const livreur1 = await User.create({
      username: 'Karim',
      email: 'karim@casalivraison.ma',
      password: hashedPassword,
      role: 'livreur',
      address: 'Maârif',
      phone: '0698765432'
    });

   
    const darNaji = await Restaurant.create({
      name: 'Dar Naji',
      description: 'Gastronomie marocaine authentique.',
      address: 'Ain Diab',
      category: 'Gastronomie marocaine',
      image_url: 'https://example.com/darnaji.jpg',
      average_prep_time: 40
    });

    const sushiHouse = await Restaurant.create({
      name: 'Sushi House',
      description: 'Cuisine asiatique raffinée.',
      address: 'Racine',
      category: 'Cuisine asiatique',
      image_url: 'https://example.com/sushihouse.jpg',
      average_prep_time: 25
    });

    const burgerKing = await Restaurant.create({ 
      name: 'Blend Burger',
      description: 'Best burgers in town. Street food premium.',
      address: 'Gauthier',
      category: 'Street food premium',
      image_url: 'https://example.com/blend.jpg',
      average_prep_time: 20
    });

    await MenuItem.create({
      name: 'Tagine Agneau',
      description: 'Tagine traditionnel aux pruneaux et amandes.',
      ingredients: 'Agneau, Pruneaux, Amandes, Oignons',
      price: 120.00,
      image_url: 'https://example.com/tagine.jpg',
      restaurant_id: darNaji.id,
      prep_time: 45
    });
    
    await MenuItem.create({
      name: 'Couscous Royal',
      description: 'Semoule fine avec 7 légumes et viande.',
      ingredients: 'Semoule, Légumes, Poulet, Merguez, Agneau',
      price: 150.00,
      image_url: 'https://example.com/couscous.jpg',
      restaurant_id: darNaji.id,
      prep_time: 60
    });

    
    await MenuItem.create({
      name: 'Plateau Tokyo',
      description: 'Assortiment de 24 pièces.',
      ingredients: 'Saumon, Thon, Avocat, Riz',
      price: 280.00,
      image_url: 'https://example.com/sushi.jpg',
      restaurant_id: sushiHouse.id,
      prep_time: 20
    });

    
    await MenuItem.create({
      name: 'Classic Cheeseburger',
      description: '150g viande hachée, cheddar, sauce maison.',
      ingredients: 'Viande, Pain, Cheddar, Salade, Tomate',
      price: 95.00,
      image_url: 'https://example.com/burger.jpg',
      restaurant_id: burgerKing.id, 
      prep_time: 15
    });

    
    const order1 = await Order.create({
      user_id: client1.id,
      restaurant_id: darNaji.id,
      livreur_id: livreur1.id,
      status: 'DELIVERED',
      total_price: 120.00,
      delivery_address: 'Gauthier'
    });

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seed;


if (require.main === module) {
  seed().then(() => process.exit());
}
