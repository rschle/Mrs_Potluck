"use strict";
var faker = require("faker");
// paste this into terminal to seed ALL seed files (must be in seperate instance of terminal than the server running)
//          $ npx sequelize-cli db:seed:all
// also it may give an error if you haven't exported the line from your env into terminal:
//          export DEV_MYSQL_URL=...

module.exports = {
  up: (queryInterface, Sequelize) => {
    let nowTime = "2019-07-10 02:43:00";
    let dummyItems = [];

    for (let i = 0; i < 50; i++) {
      let categories = [
        "Drinks",
        "Cutlery",
        "Entree",
        "Dessert",
        "Snack",
        "Vegetarian-Entree"
      ]
      let randomChoice = Math.floor(Math.random() * 6);
      let randomNumber = Math.floor(Math.random() * 50) + 1;
      let newPotluck = {
        item: faker.company.companyName(),
        category: categories[randomChoice],
        person: faker.name.findName(),
        createdAt: nowTime,
        updatedAt: nowTime,
        PotluckId: randomNumber
      };
      dummyItems.push(newPotluck);
    }
    return queryInterface.bulkInsert("PotluckItems", dummyItems, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PotluckItems", null, {});
  }
};
