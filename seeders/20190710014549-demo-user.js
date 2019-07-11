"use strict";
var faker = require("faker");
faker.seed(123);
// paste this into terminal to seed ALL seed files (must be in seperate instance of terminal than the server running)
//          $ npx sequelize-cli db:seed:all
// also it may give an error if you haven't exported the line from your env into terminal:
//          export DEV_MYSQL_URL=...

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
    let dummyUsers = [];
    for (let i = 0; i < 50; i++) {
      let newUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.hacker.verb(),
        createdAt: nowTime,
        updatedAt: nowTime
      };
      dummyUsers.push(newUser);
    }
    // let dummyUsers = [{
    // email: faker.name.findName(),
    // password: faker.internet.email(),
    // createdAt: nowTime,
    // updatedAt: nowTime
    // }, {
    //   email: "Lisa@dummy.com",
    //   password: "lisathepizza",
    //   createdAt: nowTime,
    //   updatedAt: nowTime
    // }, {
    //   email: "David@dummy.com",
    //   password: "daveismade",
    //   createdAt: nowTime,
    //   updatedAt: nowTime
    // }, {
    //   email: "Susan@dummy.com",
    //   password: "susansnoman",
    //   createdAt: nowTime,
    //   updatedAt: nowTime
    // }]

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
