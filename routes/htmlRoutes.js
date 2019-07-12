const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", {
      user: req.user ? req.user : 0
    });
  });
  // Load signup page
  app.get("/signup", (req, res) => res.render("signup"));

  // Load login page
  app.get("/login", (req, res) => res.render("login"));

  // Load profile page
  app.get("/profile", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Potluck]
    }).then(dbUser => {
      res.render("profile", { user: dbUser });
    });
  });

  //load create page
  app.get("/create", isAuthenticated, (req, res) => {
    res.render("create", { userId: req.user.id });
  });

  app.get("/potlist/:potluckURL", (req, res) => {
    db.Potluck.findOne({
      where: {
        URL: req.params.potluckURL
      }
    }).then(data => {
      if (data) {
        db.PotluckItem.findAll({
          where: {
            PotluckId: data.id
          }
        }).then(data2 => {
          return res.render("potlist", {
            id: data.id,
            admin: data.admin,
            URL: data.URL,
            name: data.name,
            time: data.time,
            description: data.description,
            items: data2
          });
        });
      } else {
          res.render("404");
      }
    });
  });

  //load addItem page
  app.get("/itemadd/:potluck/:id", (req, res) => {
    res.render("itemadd", {
      potluckURL: req.params.potluck,
      potluckID: req.params.id
    });
  });

  // Load example page and pass in an example by id
  app.get("/potluck/:id", isAuthenticated, (req, res) => {
    db.Potluck.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample,
        user: req.user
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
