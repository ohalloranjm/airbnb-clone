'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spots = [
  {
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: -122.4730327,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123,
  },
  {
    address: '43 Road Way',
    city: 'Boston',
    state: 'MA',
    country: 'USA',
    lat: 50.8999,
    lng: 101.22213,
    name: 'New apartment',
    description: 'Come live here for a week',
    price: 50.89,
  },
  {
    address: '2 Main Street, Apt. #4',
    city: 'Dallas',
    state: 'Texas',
    country: 'United States of America',
    lat: -70.20490234,
    lng: -21.2222,
    name: 'Another apartment',
    description: 'Live here',
    price: 100.99,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    spots.forEach(async spot => {
      await Spot.create(spot);
    });
  },

  async down(queryInterface, Sequelize) {
    spots.forEach(async spot => {
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        address: {
          [Op.in]: ['123 Disney Lane', '43 Road Way', '2 Main Street, Apt. #4']
        }
      });
    });
  },
};
