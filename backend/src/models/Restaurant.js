const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING 
  },
  image_url: {
    type: DataTypes.STRING
  },
  average_prep_time: {
    type: DataTypes.INTEGER, 
    defaultValue: 30
  },
  delivery_fee: {
    type: DataTypes.FLOAT,
    defaultValue: 15.00
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Restaurant;
