const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  app.get("/", (req, res) => res.render("index"));
  // Load signup page
  // app.get("/", (req, res) => res.render("signup"));

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
  app.get("/create", (req, res) => {
    res.render("create");
  });

  app.get("/potlist", (req, res) => {
    res.render("potlist");
  })

  //load addItem page
  app.get("/itemadd", (req, res) => {
    res.render("itemadd");
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
