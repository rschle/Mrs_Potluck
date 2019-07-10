"use strict";
var faker = require("faker");
// paste this into terminal to seed ALL seed files (must be in seperate instance of terminal than the server running)
//          $ npx sequelize-cli db:seed:all
// also it may give an error if you haven't exported the line from your env into terminal:
//          export DEV_MYSQL_URL=...

module.exports = {
  up: (queryInterface, Sequelize) => {
    let nowTime = "2019-07-10 02:43:00";
    let dummyPotlucks = [];
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    for (let i = 0; i < 50; i++) {
      let newPotluck = {
        name: faker.company.companyName(),
        admin: faker.name.findName(),
        time: faker.date.future(),
        createdAt: nowTime,
        updatedAt: nowTime,
        UserId: randomNumber
      };
      dummyPotlucks.push(newPotluck);
    }
    return queryInterface.bulkInsert("Potlucks", dummyPotlucks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Potlucks", null, {});
  }
};
