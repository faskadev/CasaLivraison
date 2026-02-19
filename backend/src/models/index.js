const sequelize = require('../config/database');
const User = require('./User');
const Restaurant = require('./Restaurant');
const MenuItem = require('./MenuItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');


Restaurant.hasMany(MenuItem, { foreignKey: 'restaurant_id', as: 'menuItems' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });


User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'customer' });


Restaurant.hasMany(Order, { foreignKey: 'restaurant_id', as: 'orders' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });


Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });


MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id', as: 'orderItems' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id', as: 'menuItem' });

// Order - Livreur (User as Livreur)
User.hasMany(Order, { foreignKey: 'livreur_id', as: 'deliveries' });
Order.belongsTo(User, { foreignKey: 'livreur_id', as: 'livreur' });

const db = {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  sequelize
};

module.exports = db;
