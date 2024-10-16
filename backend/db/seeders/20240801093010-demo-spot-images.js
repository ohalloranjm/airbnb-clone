'use strict';

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = await Spot.findAll();

    const spotIds = [];
    spots.forEach(spot => {
      spotIds.push(spot.id);
    });

    const imageUrls = [
      '/ocean.png',
      '/ocean2.png',
      '/ocean3.png',
      '/ocean4.png',
      '/ocean5.png',
      '/ocean6.png',
      '/underwater.png',
      '/underwater2.png',
      '/underwater3.png',
      '/underwater4.png',
      '/puddle.png',
      '/puddle2.png',
      '/puddle3.png',
      '/puddle4.png',
      '/river.png',
      '/river2.png',
      '/river3.png',
      '/river4.png',
      '/waterpark.png',
      '/waterpark2.png',
      '/waterpark3.png',
      '/waterpark4.png',
    ];
    let currentUrl = 0;

    const images = [];

    for (const spotId of spotIds) {
      for (let i = 0; i < 5; i++) {
        images.push({ spotId, preview: !i, url: imageUrls[currentUrl] });
        currentUrl = (currentUrl + 1) % imageUrls.length;
      }
    }

    for (const image of images) {
      await SpotImage.create(image);
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.startsWith]: '/',
      },
    });
  },
};
