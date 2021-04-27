"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let usersArr = [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
        // DOB: new Date(1995, 11, 13),
      },
      {
        email: faker.internet.email(),
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        // DOB: new Date(1980, 10, 23),
      },
      {
        email: faker.internet.email(),
        username: "FakeUser2",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        // DOB: new Date(1977, 10, 18),
      },
    ];
    // generate regular user
    for (let i = 0; i <= 10; i++) {
      const years = 30;
      let user = {
        email: faker.internet.email(),
        // DOB: faker.date.past(years, new Date()),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
      };
      usersArr.push(user);
    }
    // generate hosts(thru user model)
    for (let i = 0; i <= 15; i++) {
      const years = 30;
      let host = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        // DOB: faker.date.past(years, new Date()),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatar: faker.image.nightlife(),
        description: faker.lorem.paragraph(),
      };
      usersArr.push(host);
    }
    return queryInterface.bulkInsert("Users", usersArr, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", null, {});
  },
};
