const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Restaurant = require('./Restaurant');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    references: { model: Restaurant, key: 'id' }
  },
  livreur_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: User, key: 'id' } 
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'VALIDATED', 'DELIVERED', 'CANCELLED'),
    defaultValue: 'PENDING'
  },
  total_price: {
    type: DataTypes.FLOAT,
    defaultValue: 0.00
  },
  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estimated_delivery_time: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true
});

module.exports = Order;
