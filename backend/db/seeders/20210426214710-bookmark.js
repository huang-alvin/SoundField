"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bookmarkArr = [];
    for (let i = 0; i <= 25; i++) {
      let bookmark = {
        userId: Math.floor(Math.random() * 25),
        eventId: Math.floor(Math.random() * 16),
      };
      bookmarkArr.push(bookmark);
    }

    return queryInterface.bulkInsert("Bookmarks", bookmarkArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
