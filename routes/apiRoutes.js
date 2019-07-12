const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const faker = require("faker");
var URL = faker.lorem.words() + faker.lorem.words() + faker.lorem.words();
var URL2 = URL.replace(/ /g, "");
module.exports = app => {
  // Get all examples
  app.get("/api/potlucks", (req, res) => {
    db.Potluck.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbPotlucks => {
      res.json(dbPotlucks);
    });
  });

  // Create a new example
  app.post("/api/potlucks", isAuthenticated, (req, res) => {
    db.Potluck.create({
      name: req.body.name,
      admin: req.user.name,
      time: req.body.time,
      URL: URL2,
      description: req.body.description,
      UserId: req.user.id
    }).then(dbPotluck => {
      res.json(dbPotluck.dataValues);
      // console.log(dbPotluck);
      // res.redirect("/potlist/cool");
    });
  });

  // Delete an example by id
  app.delete("/api/potlucks/:id", isAuthenticated, (req, res) => {
    db.Potluck.destroy({ where: { id: req.params.id } }).then(dbPotluck => {
      res.json(dbPotluck);
    });
  });

  app.get("/api/potluck-items", (req, res) => {
    db.PotluckItems.findAll({}).then(dbPotluckItems => {
      res.json(dbPotluckItems);
    });
  });

  //routing for displaying all of the potlucks you are a part of
  app.get("/api/allpotlucks", (req, res) => {
    db.potluck
      .findAll({
        where: {
          UserId: req.user.id
        }
      })
      .then(dbPotlucks => {
        res.json(dbPotlucks);
      });
  });

  // Create a new potluck item
  app.post("/api/potluck-items", (req, res) => {
    db.PotluckItem.create({
      item: req.body.item,
      category: req.body.category,
      person: req.body.person,
      PotluckId: req.body.PotluckId
    }).then(dbPotluckItem => {
      res.json(dbPotluckItem);
    });
  });

  // Delete an example by id
  app.delete("/api/potluck-items/:id", isAuthenticated, (req, res) => {
    db.PotluckItem.destroy({ where: { id: req.params.id } }).then(
      dbPotluckItem => {
        res.json(dbPotluckItem);
      }
    );
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
