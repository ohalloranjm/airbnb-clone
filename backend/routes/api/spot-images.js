const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');

const {
  Spot,
  SpotImage,
  Sequelize,
} = require('../../db/models');

const Op = Sequelize.Op;

router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const image = await SpotImage.findOne({
    where: {
      id: imageId,
    },
    include: {
      model: Spot,
    },
  });

  if (!image) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  const userId = req.user.id;
  if (image.Spot.ownerId !== userId) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  await image.destroy();

  res.json({
    message: 'Successfully deleted',
  });
});

module.exports = router;
