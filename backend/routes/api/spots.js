const express = require('express');
const router = express.Router();

const { Spot, Review, SpotImage, Sequelize } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
        }
      ],
    });

    for (const spot of spots) {
      let totalStars = 0;
      spot.Reviews.forEach(review => {
        totalStars += review.stars;
      });

      const avgRating = totalStars / spot.Reviews.length;
      spot.dataValues.avgRating = avgRating;

      const previewImages = spot.SpotImages.find(image => image.preview);
      spot.dataValues.previewImage = previewImages.url;

      spot.dataValues.Reviews = undefined;
      spot.dataValues.SpotImages = undefined;
    }

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
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
});

module.exports = router;
