const express = require('express');
const router = express.Router();

const { Spot, Sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    res.json({
      Spots: spots,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    res.status(201).json(newSpot);
  } catch (err) {
    if ( err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: err.message
      });
    }
  }
});

module.exports = router;
