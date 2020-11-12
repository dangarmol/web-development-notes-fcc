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
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const store = new MongoStore({ url: process.env.MONGO_URI });

const routes = require("./routes");
const auth = require("./auth");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use(session({
  secret: process.env.SESSION_SECRET,  // Used to compute the hash used to encrypt the cookie.
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: "express.sid",
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());

io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "express.sid",
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

myDB(async client => {
  const myDataBase = await client.db("FreeCodeCamp").collection("users");

  routes(app, myDataBase);
  auth(app, myDataBase);

  let currentUsers = 0;

  io.on("connection", socket => {
    ++currentUsers;
    //io.emit("user count", currentUsers);
    console.log("User " + socket.request.user.name + " connected.");
    io.emit("user", {
      name: socket.request.user.name,
      currentUsers,
      connected: true
    });

    socket.on("disconnect", () => {
      --currentUsers;
      //io.emit("user count", currentUsers);
      console.log("User " + socket.request.user.name + " disconnected.");
      io.emit("user", {
        name: socket.request.user.name,
        currentUsers,
        connected: false
      });
    });

    socket.on("chat message", (message) => {
      io.emit("chat message", {
        name: socket.request.user.name,
        message: message
      });
    });
  });

}).catch(e => {
  app.route("/").get((req, res) => {
    res.render(process.cwd() + "/views/pug/index", { title: e, message: "Unable to login" });
  });
});

function onAuthorizeSuccess(data, accept) {
  console.log("Successful connection to socket.io");

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log("Failed connection to socket.io:", message);
  accept(null, false);
}

http.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
