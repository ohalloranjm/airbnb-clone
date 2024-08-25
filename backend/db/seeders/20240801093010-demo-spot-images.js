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

    const images = [
      {
        spotId: spotIds[0],
        url: '/ocean.png',
        preview: true,
      },
      {
        spotId: spotIds[0],
        url: '/ocean2.png',
        preview: false,
      },
      {
        spotId: spotIds[0],
        url: '/ocean3.png',
        preview: false,
      },
      {
        spotId: spotIds[0],
        url: '/ocean4.png',
        preview: false,
      },
      {
        spotId: spotIds[1],
        url: '/underwater.png',
        preview: true,
      },
      {
        spotId: spotIds[1],
        url: '/underwater2.png',
        preview: false,
      },
      {
        spotId: spotIds[1],
        url: '/underwater3.png',
        preview: false,
      },
      {
        spotId: spotIds[1],
        url: '/underwater4.png',
        preview: false,
      },
      {
        spotId: spotIds[2],
        url: '/puddle.png',
        preview: true,
      },
      {
        spotId: spotIds[2],
        url: '/puddle2.png',
        preview: false,
      },
      {
        spotId: spotIds[2],
        url: '/puddle3.png',
        preview: false,
      },
      {
        spotId: spotIds[2],
        url: '/puddle4.png',
        preview: false,
      },
      {
        spotId: spotIds[3],
        url: '/river.png',
        preview: true,
      },
      {
        spotId: spotIds[3],
        url: '/river2.png',
        preview: false,
      },
      {
        spotId: spotIds[3],
        url: '/river3.png',
        preview: false,
      },
      {
        spotId: spotIds[3],
        url: '/river4.png',
        preview: false,
      },
      {
        spotId: spotIds[4],
        url: '/waterpark.png',
        preview: true,
      },
      {
        spotId: spotIds[4],
        url: '/waterpark2.png',
        preview: false,
      },
      {
        spotId: spotIds[4],
        url: '/waterpark3.png',
        preview: false,
      },
      {
        spotId: spotIds[4],
        url: '/waterpark4.png',
        preview: false,
      },
    ];

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
