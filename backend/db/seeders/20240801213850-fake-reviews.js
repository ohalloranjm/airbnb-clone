'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [
      {
        spotId: 1,
        userId: 2,
        review:
          "The spot was okay, but I don't think it's worth the hype. There are other places nearby that offer a similar experience at a better value.",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 1,
        review:
          "This is hands down the best place I've visited this year. The experience was outstanding and it exceeded all my expectations. Highly recommended!",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review:
          'I really enjoyed visiting this spot. The atmosphere was great and the service was excellent. However, I think there could be some improvements in the amenities offered.',
        stars: 4,
      },
      {
        spotId: 1,
        userId: 2,
        review:
          'I was initially impressed with this location, but my experience was marred by poor maintenance and cleanliness issues. I expected better for the price.',
        stars: 2,
      },
    ];

    for (const review of reviews) {
      await Review.create(review);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1, 3],
      },
      userId: {
        [Op.in]: [2, 1],
      },
    });
  },
};
