const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restaurant = require('./Restaurant');

const MenuItem = sequelize.define('MenuItem', {
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
    type: DataTypes.TEXT
  },
  ingredients: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0.00
  },
  image_url: {
    type: DataTypes.STRING
  },
  prep_time: {
    type: DataTypes.INTEGER, // in minutes
    defaultValue: 15
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: 'id'
    }
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = MenuItem;
