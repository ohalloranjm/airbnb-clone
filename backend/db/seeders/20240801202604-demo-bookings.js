'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = [
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-08-04',
        endDate: '2024-08-09',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-08-14',
        endDate: '2024-08-19',
      },
    ];

    for (const booking of bookings) {
      await Booking.create(booking);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 3],
        },
        userId: {
          [Op.in]: [2, 1],
        },
      },
      {},
    );
  },
};
