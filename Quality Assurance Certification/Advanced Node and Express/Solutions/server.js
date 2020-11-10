"use strict";
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const ObjectID = require("mongodb").ObjectID;

const routes = require('./routes.js');
const auth = require('./auth.js');

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

  routes(app, myDataBase);
  auth(app, myDataBase);

}).catch(e => {
  app.route("/").get((req, res) => {
    res.render(process.cwd() + "/views/pug/index", { title: e, message: "Unable to login" });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
