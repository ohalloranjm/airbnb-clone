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
        review: "It's ok",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Amaaazing!',
        stars: 5,
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
