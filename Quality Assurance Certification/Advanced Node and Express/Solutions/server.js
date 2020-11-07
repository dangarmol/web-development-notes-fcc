"use strict";
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const ObjectID = require("mongodb").ObjectID;

const app = express();

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use(session({
  secret: process.env.SESSION_SECRET,  // Used to compute the hash used to encrypt the cookie.
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

myDB(async client => {
  const myDataBase = await client.db("FreeCodeCamp").collection("users");

  app.route("/").get((req, res) => {
    res.render(process.cwd() + "/views/pug/index", {
      title: "Connected to Database",
      message: "Please login",
      showLogin: true
    });
  });

  app.post("/login", passport.authenticate("local", { failureRedirect: "/" }), function(req, res) {
    res.redirect("/profile");
  });

  app.get("/profile", ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/views/pug/profile", {
      username: req.user.username
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.use((req, res, next) => {
    res.status(404)
      .type("text")
      .send("Error 404: Page not found!");
  });

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      myDataBase.findOne({ username: username }, function (err, user) {
        console.log("User " + username + " attempted to log in.");
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (password !== user.password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

}).catch(e => {
  app.route("/").get((req, res) => {
    res.render(process.cwd() + "/views/pug/index", { title: e, message: "Unable to login" });
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
