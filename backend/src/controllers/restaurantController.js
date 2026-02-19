const { Restaurant, MenuItem } = require('../models');

exports.getAllRestaurants = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category) {
      where.category = category;
    }
    const restaurants = await Restaurant.findAll({ where });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByPk(id, {
      include: [{ model: MenuItem, as: 'menuItems' }]
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant details', error: error.message });
  }
};
