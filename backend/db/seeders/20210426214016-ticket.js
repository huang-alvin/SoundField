"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let ticketArr = [
      {
        userId: 1,
        eventId: 1,
      },
      {
        userId: 1,
        eventId: 10,
      },
    ];
    for (let i = 0; i <= 25; i++) {
      let ticket = {
        userId: Math.ceil(Math.random() * 20),
        eventId: Math.ceil(Math.random() * 20),
      };
      ticketArr.push(ticket);
    }

    return queryInterface.bulkInsert("Tickets", ticketArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tickets", null, {});
  },
};
