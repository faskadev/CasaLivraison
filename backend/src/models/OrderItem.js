const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const MenuItem = require('./MenuItem');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: 'id' }
  },
  menu_item_id: {
    type: DataTypes.INTEGER,
    references: { model: MenuItem, key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  unit_price: {
    type: DataTypes.FLOAT, 
    defaultValue: 0.00
  },
  total_price: {
    type: DataTypes.FLOAT, 
    defaultValue: 0.00
  }
}, {
  timestamps: true
});

module.exports = OrderItem;
