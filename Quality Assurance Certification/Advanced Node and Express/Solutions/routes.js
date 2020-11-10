const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = function (app, myDataBase) {

   app.route("/").get((req, res) => {
      res.render(process.cwd() + "/views/pug/index", {
        title: "Connected to Database",
        message: "Please login",
        showLogin: true,
        showRegistration: true
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
  
   app.route("/register").post((req, res, next) => {
      myDataBase.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
          next(err);
        } else if (user) {
          res.redirect("/");
        } else {
          const hash = bcrypt.hashSync(req.body.password, 12);
          myDataBase.insertOne({
            username: req.body.username,
            password: hash  // We pass the hashed version of the password instead of the password itself.
          },
            (err, doc) => {
              if (err) {
                res.redirect("/");
              } else {
                // The inserted document is held within
                // the ops property of the doc
                next(null, doc.ops[0]);
              }
            }
          )
        }
      })
   },
      passport.authenticate("local", { failureRedirect: "/" }), (req, res, next) => {
        res.redirect("/profile");
      }
   );
  
   app.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
   });
  
   app.use((req, res, next) => {
      res.status(404)
        .type("text")
        .send("Error 404: Page not found!");
   });
}

function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
     return next();
   }
   res.redirect("/");
 };