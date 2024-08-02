const express = require('express');
const router = express.Router();

const { Spot, Review, ReviewImage, Sequelize, User } = require('../../db/models');

router.get('/current', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
  });

  res.json(reviews);
});

router.post('/:reviewId/images', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId,
      },
      include: [{ model: ReviewImage }],
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    if (review.ReviewImages.length === 10) {
      return res.status(403).json({
        message: 'Maximum number of images for this resource was reached',
      });
    }

    const newImage = await review.createReviewImage(req.body);

    res.status(201).json(newImage);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: 'Bad request',
        errors: {
          [err.errors[0].path]: err.errors[0].message,
        },
      });
    }
  }
});

router.put('/:reviewId', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    await review.update(req.body);
    await review.save();

    res.json(review);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          [err.errors[0].path]: err.errors[0].message,
        },
      });
    }
  }
});

router.delete('/:reviewId', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
    });
  }

  const { reviewId } = req.params;
  const userId = req.user.id;
  const review = await Review.findOne({
    where: {
      userId,
      id: reviewId,
    },
  });

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  await review.destroy();
  res.json({
    message: 'Successfully deleted',
  });
});

module.exports = router;
