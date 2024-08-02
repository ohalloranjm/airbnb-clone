const express = require('express');
const router = express.Router();

const { Spot, Review, ReviewImage, SpotImage, Sequelize, User } = require('../../db/models');
const { json } = require('sequelize');

router.get('/:spotId/reviews', async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url'],
          },
        ],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  res.json({
    Reviews: spot.Reviews,
  });
});

router.post('/:spotId/reviews', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.Reviews.find(review => review.userId === userId)) {
      return res.status(500).json({
        message: 'User already has a review for this spot',
      });
    }

    const newReview = await spot.createReview({
      ...req.body,
      userId,
    });

    res.status(201).json(newReview);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      console.log(err);
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          [err.errors[0].path]: err.errors[0].message,
        },
      });
    }
  }
});

router.get('/current', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  const resBody = [];
  const id = req.user.id;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: id,
    },
    include: [
      {
        model: SpotImage,
        where: {
          preview: true,
        },
      },
      {
        model: Review,
        attributes: ['stars'],
      },
    ],
  });

  for (let spot of userSpots) {
    spot = spot.toJSON();
    let totalStars = 0;
    spot.Reviews.forEach(review => {
      totalStars += review.stars;
    });

    const avgRating = totalStars / spot.Reviews.length;
    spot.avgRating = avgRating;

    const previewImages = spot.SpotImages.find(image => image.preview);
    spot.previewImage = previewImages.url;

    delete spot.Reviews;
    delete spot.SpotImages;
    resBody.push(spot);
  }

  res.json({
    Spots: [...resBody],
  });
});

router.get('/:spotId', async (req, res, next) => {
  try {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
        },
        {
          model: Review,
          attributes: ['stars'],
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    spot = spot.toJSON();

    let totalStars = 0;
    if (spot.Reviews.length) {
      spot.Reviews.forEach(review => {
        totalStars += review.stars;
      });

      const avgRating = totalStars / spot.Reviews.length;
      spot.avgStarRating = avgRating;
    }

    spot.Owner = spot.User;
    spot.numReviews = spot.Reviews.length;
    delete spot.Reviews;
    delete spot.User;

    const {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
      numReviews,
      avgStarRating,
      SpotImages,
      Owner,
    } = spot;

    res.json({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
      numReviews,
      avgStarRating,
      SpotImages,
      Owner,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:spotId/images', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const { spotId } = req.params;
    const ownerId = req.user.id;
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId,
      },
      include: [
        {
          model: SpotImage,
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const newImage = await spot.createSpotImage(req.body);

    res.status(201).json(newImage);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
});

router.put('/:spotId', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const { spotId } = req.params;
    const ownerId = req.user.id;

    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId,
      },
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    await spot.update(req.body);
    await spot.save();

    res.json(spot);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
});

router.delete('/:spotId', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  const { spotId } = req.params;
  const ownerId = req.user.id;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId,
    },
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  await spot.destroy();
  res.json({
    message: 'Successfully deleted',
  });
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

router.get('/', async (req, res, next) => {
  try {
    const resBody = [];
    const spots = await Spot.findAll({
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
        },
      ],
    });

    for (let spot of spots) {
      spot = spot.toJSON();
      let totalStars = 0;
      spot.Reviews.forEach(review => {
        totalStars += review.stars;
      });

      const avgRating = totalStars / spot.Reviews.length;
      spot.avgRating = avgRating;

      const previewImages = spot.SpotImages.find(image => image.preview);
      if (previewImages) spot.previewImage = previewImages.url;

      delete spot.Reviews;
      delete spot.SpotImages;
      resBody.push(spot);
    }

    res.json({
      Spots: [...resBody],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
