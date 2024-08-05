const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');

const { Review, ReviewImage } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const image = await ReviewImage.findByPk(imageId);

  if (!image) {
    return res.status(404).json({
      message: "Review Image couldn't be found"
    });
  }

  const review = await Review.findByPk(image.reviewId);
  const userId = req.user.id;

  if (review.userId !== userId) {
    return res.status(403).json({
      message: 'Forbidden'
    });
  }

  await image.destroy();

  res.json({
    message: 'Successfully deleted'
  });
});

module.exports = router;
