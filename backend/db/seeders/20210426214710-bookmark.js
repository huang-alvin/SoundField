"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bookmarkArr = [
      {
        userId: 1,
        eventId: 2,
      },
    ];
    for (let i = 0; i <= 25; i++) {
      let bookmark = {
        userId: Math.ceil(Math.random() * 25),
        eventId: Math.ceil(Math.random() * 25),
      };
      bookmarkArr.push(bookmark);
    }

    return queryInterface.bulkInsert("Bookmarks", bookmarkArr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
