"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let typeList = [
      "Rock",
      "Surf",
      "Indie Pop",
      "Classical",
      "Jazz",
      "Electronic",
      "Folk",
      "R&B",
      "Rap",
    ];
    let categoryList = [];
    typeList.forEach((type) => categoryList.push({ type }));
    // for (let i = 0; i < 20; i++) {
    //   let category = {
    //     type: typeList[Math.floor(Math.random() * 9)],
    //     eventId: Math.ceil(Math.random() * 25),
    //   };
    //   categoryList.push(category);
    // }
    // return queryInterface.bulkInsert("Categories", categoryList, {});
    return queryInterface.bulkInsert("Categories", categoryList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
