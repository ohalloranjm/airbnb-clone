'use strict';

const { Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '456 Sunset Boulevard',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 34.0980031,
        lng: -118.3261728,
        name: 'Hollywood Dreams',
        description: 'Experience the glamour of Hollywood',
        price: 250,
        ownerId: (
          await User.findOne({
            where: {
              username: 'FakeUser1',
            },
          })
        ).id,
      },
      {
        address: '789 Broadway',
        city: 'New York',
        state: 'New York',
        country: 'United States of America',
        lat: 40.7589632,
        lng: -73.9851853,
        name: 'Times Square Loft',
        description: 'Stay in the heart of the city that never sleeps',
        price: 300,
        ownerId: (
          await User.findOne({
            where: {
              username: 'FakeUser2',
            },
          })
        ).id,
      },
      {
        address: '101 Ocean Drive',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 25.7742658,
        lng: -80.1307602,
        name: 'Beachfront Paradise',
        description: 'Luxurious condo with stunning ocean views',
        price: 280,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '202 Bourbon Street',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States of America',
        lat: 29.9584497,
        lng: -90.0653834,
        name: 'French Quarter Gem',
        description: 'Historic house in the heart of NOLA',
        price: 175,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '303 Wall Street',
        city: 'New York',
        state: 'New York',
        country: 'United States of America',
        lat: 40.706875,
        lng: -74.011265,
        name: 'Financial District Penthouse',
        description: 'Modern living in NYC’s financial hub',
        price: 500,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '404 Maple Drive',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States of America',
        lat: 32.7766642,
        lng: -96.7969879,
        name: 'Luxury Texan Mansion',
        description: 'A sprawling estate in Dallas, Texas',
        price: 450,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '505 Pine Avenue',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States of America',
        lat: 47.6062095,
        lng: -122.3320708,
        name: 'Emerald City Retreat',
        description: 'High-rise apartment with stunning views',
        price: 230,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '606 King Street',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'United States of America',
        lat: 32.7846184,
        lng: -79.9409186,
        name: 'Southern Charm Bungalow',
        description: 'Charming home in historic Charleston',
        price: 190,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '707 Beale Street',
        city: 'Memphis',
        state: 'Tennessee',
        country: 'United States of America',
        lat: 35.139072,
        lng: -90.050585,
        name: 'Blues & BBQ Getaway',
        description: 'Cozy spot near famous music venues',
        price: 160,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '808 Rodeo Drive',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States of America',
        lat: 34.07362,
        lng: -118.400356,
        name: 'Beverly Hills Luxury',
        description: 'Exclusive residence in a world-famous location',
        price: 1000,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '909 Bourbon Lane',
        city: 'Lexington',
        state: 'Kentucky',
        country: 'United States of America',
        lat: 38.040584,
        lng: -84.503716,
        name: 'Bluegrass Country Retreat',
        description: 'Relax in the heart of Kentucky’s horse country',
        price: 200,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1010 Pearl Street',
        city: 'Boulder',
        state: 'Colorado',
        country: 'United States of America',
        lat: 40.015,
        lng: -105.2705,
        name: 'Mountain View Loft',
        description: 'Beautiful loft in scenic Boulder',
        price: 350,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1111 Music Row',
        city: 'Nashville',
        state: 'Tennessee',
        country: 'United States of America',
        lat: 36.152244,
        lng: -86.798358,
        name: 'Country Music Haven',
        description: 'Music lovers’ paradise in Nashville',
        price: 220,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1212 Lincoln Road',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'United States of America',
        lat: 25.790654,
        lng: -80.135257,
        name: 'Miami Beach Penthouse',
        description: 'Sleek penthouse with panoramic ocean views',
        price: 600,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1313 Market Street',
        city: 'Philadelphia',
        state: 'Pennsylvania',
        country: 'United States of America',
        lat: 39.952583,
        lng: -75.165222,
        name: 'Liberty Bell Apartment',
        description: 'Apartment in historic Philly, near landmarks',
        price: 180,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1414 Sixth Avenue',
        city: 'San Diego',
        state: 'California',
        country: 'United States of America',
        lat: 32.715736,
        lng: -117.161087,
        name: 'Downtown San Diego Condo',
        description: 'Stylish condo in the heart of San Diego',
        price: 250,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1515 Fremont Street',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        lat: 36.169941,
        lng: -115.139832,
        name: 'Vegas Strip Suite',
        description: 'Luxury suite steps from the Las Vegas Strip',
        price: 700,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1616 Collins Avenue',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'United States of America',
        lat: 25.790654,
        lng: -80.135257,
        name: 'South Beach Villa',
        description: 'Upscale villa near Miami’s best beaches',
        price: 950,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1717 Main Street',
        city: 'Austin',
        state: 'Texas',
        country: 'United States of America',
        lat: 30.267153,
        lng: -97.7430608,
        name: 'Live Music Capital Loft',
        description: 'Chic loft in Austin’s vibrant downtown',
        price: 300,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1818 Duval Street',
        city: 'Key West',
        state: 'Florida',
        country: 'United States of America',
        lat: 24.555059,
        lng: -81.780021,
        name: 'Key West Hideaway',
        description: 'Private cottage in tropical paradise',
        price: 400,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '1919 Canal Street',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States of America',
        lat: 29.951065,
        lng: -90.071533,
        name: 'NOLA Jazz Retreat',
        description: 'Jazz-inspired home in New Orleans',
        price: 225,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2020 Pike Place',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States of America',
        lat: 47.610377,
        lng: -122.342776,
        name: 'Market View Suite',
        description: 'Suite overlooking the famous Pike Place Market',
        price: 450,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2121 Hollywood Boulevard',
        city: 'Hollywood',
        state: 'California',
        country: 'United States of America',
        lat: 34.0980031,
        lng: -118.3261728,
        name: 'Hollywood Glamour House',
        description: 'Chic home steps away from Hollywood attractions',
        price: 500,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2222 Alamo Plaza',
        city: 'San Antonio',
        state: 'Texas',
        country: 'United States of America',
        lat: 29.426,
        lng: -98.4861,
        name: 'The Alamo Oasis',
        description: 'Historic charm right by the Alamo',
        price: 270,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2323 Congress Avenue',
        city: 'Austin',
        state: 'Texas',
        country: 'United States of America',
        lat: 30.267153,
        lng: -97.7430608,
        name: 'Congress Street Retreat',
        description: 'Modern house in the heart of Austin',
        price: 320,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2424 Broadway',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.794574,
        lng: -122.439672,
        name: 'Nob Hill Mansion',
        description: 'Elegant mansion with panoramic city views',
        price: 1200,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2525 Main Street',
        city: 'Santa Monica',
        state: 'California',
        country: 'United States of America',
        lat: 34.0195,
        lng: -118.4912,
        name: 'Ocean View Penthouse',
        description: 'Penthouse apartment with beach views',
        price: 800,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
      {
        address: '2626 Fremont Street',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        lat: 36.169941,
        lng: -115.139832,
        name: 'Vintage Vegas Suite',
        description: 'Classic Las Vegas charm with a modern twist',
        price: 320,
        ownerId: (
          await User.findOne({
            where: {
              username: 'DemoUser',
            },
          })
        ).id,
      },
    ];

    for (const spot of spots) {
      await Spot.create(spot);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: {
        [Op.in]: [
          '202 Bourbon Street',
          '101 Ocean Drive',
          '789 Broadway',
          '456 Sunset Boulevard',
          '123 Disney Lane',
        ],
      },
    });
  },
};
