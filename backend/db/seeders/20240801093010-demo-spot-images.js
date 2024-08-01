'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const images = [
      {
        spotId: 1,
        url: 'image url',
        preview: true
      },
      {
        spotId: 3,
        url: 'image url',
        preview: true
      },
      {
        spotId: 2,
        url: 'image url',
        preview: true
      },
    ]

    for (const image of images) {
      await SpotImage.create(image)
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const Op = Sequelize.Op

    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {
      url: 'image url',
      spotId: {
        [Op.in]: [1, 2, 3]
      }
    })
  }
};
