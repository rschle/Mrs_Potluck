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
    let dummyPotlucks = [];
    let count = 0;
    for (let i = 0; i < 50; i++) {
      let randomNumber = Math.floor(Math.random() * 50) + 1;
      let URL = faker.lorem.words() + faker.lorem.words() + faker.lorem.words();
      let URL2 = URL.replace(/ /g, "");
      let newPotluck = {
        name: faker.company.companyName(),
        admin: faker.name.findName(),
        time: faker.date.future(),
        URL: URL2,
        description: "This is a party, there will be punch and pie and much revelry!",
        createdAt: nowTime,
        updatedAt: nowTime,
        UserId: randomNumber
      };
      dummyPotlucks.push(newPotluck);
    }
    faker.seed(123);
    for (let i = 0; i < dummyPotlucks.length; i++) {
      count++;
      if (count % 20 === 0) {
        faker.seed(123);
      }
      dummyPotlucks[i].admin = faker.name.findName()
    }
    return queryInterface.bulkInsert("Potlucks", dummyPotlucks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Potlucks", null, {});
  }
};
