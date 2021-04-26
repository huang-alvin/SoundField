"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let ticketArr = [];
    for (let i = 0; i <= 25; i++) {
      let ticket = {
        userId: Math.floor(Math.random() * 25),
        eventId: Math.floor(Math.random() * 16),
      };
      ticketArr.push(ticket);
    }

    return queryInterface.bulkInsert("Tickets", ticketArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tickets", null, {});
  },
};
