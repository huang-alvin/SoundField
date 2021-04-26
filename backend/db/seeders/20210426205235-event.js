"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let eventArr = [];

    let year = 2021;
    let month = Math.floor(Math.random() * 12);
    let day = Math.floor(Math.random() * 26);
    let startHour = Math.floor(Math.random() * 24);
    let duration = Math.floor(Math.random() * 3);
    let priceList = [15, 20, 25, 50];
    let ageList = [18, 21];
    let capacityList = [100, 500, 1000, 5000, 10000];

    for (let i = 0; i <= 15; i++) {
      let id = Math.floor(Math.random() * 25);
      let event = {
        userId: id,
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        start_date: new Date(year, month, day, startHour),
        end_date: new Date(year, month, day, startHour + duration),
        location: `${faker.address.streetAddress()} ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
        price: priceList[Math.floor(Math.random() * 4)],
        capacity: capacityList[Math.floor(Math.random() * 5)],
        age_limit: ageList[Math.floor(Math.random() * 2)],
        image: faker.image.abstract(),
      };
      eventArr.push(event);
    }
    return queryInterface.bulkInsert("Events", eventArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events", null, {});
  },
};
