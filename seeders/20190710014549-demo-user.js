"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    // let now = new Date();
    // let nowTime = now.toISOString();
    let nowTime = "2019-07-10 02:43:00";
    let dummyUsers = [
      {
        email: "Ross@dummy.com",
        password: "rossisboss",
        createdAt: nowTime,
        updatedAt: nowTime
      },
      {
        email: "Lisa@dummy.com",
        password: "lisathepizza",
        createdAt: nowTime,
        updatedAt: nowTime
      },
      {
        email: "David@dummy.com",
        password: "daveismade",
        createdAt: nowTime,
        updatedAt: nowTime
      },
      {
        email: "Susan@dummy.com",
        password: "susansnoman",
        createdAt: nowTime,
        updatedAt: nowTime
      }
    ];

    return queryInterface.bulkInsert("Users", dummyUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
