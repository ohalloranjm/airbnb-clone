const express = require('express');
const router = express.Router();

const { Spot, Review, SpotImage, Sequelize, User } = require('../../db/models');


router.get('/current', async (req, res, next) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId
    }
  });

  res.json(reviews);
});

module.exports = router;
