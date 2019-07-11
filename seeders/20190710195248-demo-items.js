"use strict";
var faker = require("faker");
faker.seed(123);
// paste this into terminal to seed ALL seed files (must be in seperate instance of terminal than the server running)
//          $ npx sequelize-cli db:seed:all
// also it may give an error if you haven't exported the line from your env into terminal:
//          export DEV_MYSQL_URL=...

module.exports = {
  up: (queryInterface, Sequelize) => {
    let nowTime = "2019-07-10 02:43:00";
    let dummyItems = [];
    let count = 0;
    let categories = [
      "Drinks",
      "Cutlery",
      "Entree",
      "Dessert",
      "Snack",
      "Vegetarian-Entree"
    ];
    for (let i = 0; i < 250; i++) {
      count++;
      if (count % 20 === 0) {
        faker.seed(123);
      }
      let randomChoice = Math.floor(Math.random() * 6);
      let randomNumber = Math.floor(Math.random() * 50) + 1;
      let newItem = {
        item: faker.commerce.product(),
        category: categories[randomChoice],
        person: faker.name.findName(),
        createdAt: nowTime,
        updatedAt: nowTime,
        PotluckId: randomNumber
      };
      dummyItems.push(newItem);
      faker.seed(123);
      for (let i = 0; i < dummyItems.length; i++) {
        count++;
        if (count % 50 === 0) {
          faker.seed(123);
        }
        dummyItems[i].person = faker.name.findName()
      }
    }
    return queryInterface.bulkInsert("PotluckItems", dummyItems, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PotluckItems", null, {});
  }
};
