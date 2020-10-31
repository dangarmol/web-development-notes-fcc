const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:  {type: String, required: true},
  log:  [
          {
            description: String,
            duration: Number,
            date: Date
          }
        ]
});

var User = mongoose.model("User", userSchema, "exercise-tracker");

/**
 * Return:
 * an object with username and _id
    {
      "username": "dandandan",
      "_id": "5f7cbec6ebd65c0039866141"
    }

  If taken, return "Username already taken"
*/
app.post("/api/exercise/new-user", async (req, res) => {
  
  console.log("POST: Adding " + req.body.username + " to database...")

  const user = await User.findOne({ "username": req.body.username });

  if(user) {
    res.send("Username already taken");
  } else {

    const newUser = new User({
      username: req.body.username
    })

    await newUser.save(function(err, data) {
      if (err) return console.error(err);
      res.json({"username": data.username, "_id": data.id});
    });

  }
  
});

/**
 * Return:
 * App will return the user object with the exercise fields added.
  {
    "_id": "5f7cbf8febd65c0039866144",
    "username": "dandandan2",
    "date": "Sun Sep 06 2020",
    "duration": 25,
    "description": "Ejercicio 1"
  }

  Given:
  Post with ID, exercise name, duration and (date). If no date supplied it will use current date.
 */
app.post("/api/exercise/add", async (req, res) => {
  
  console.log("POST: Adding exercise " + req.body.description + " to database...")

  const user = await User.findOne({ "_id": req.body.userId });

  if(!user) {
    res.send("User ID not found");
  } else {
    const newLog = {"description": req.body.description, "duration": req.body.duration, "date": req.body.date};

    User.update({ "_id": req.body.userId }, { $push: { log: newLog } }, {new: true}, function (err, data) {
      if (err) return console.error(err);
      const newAdded = data.log[data.log.length - 1];
      res.json({"_id": data.id, "username": data.username, "date": newAdded.date, "duration": newAdded.duration, "description": newAdded.description});
    });

  }
  
});

/**
 * Return:
 * {
    "_id": "5f7cbf8febd65c0039866144",
    "username": "dandandan2",
    "count": 2,
    "log":
    [
      {
        "description": "Ejercicio 1",
        "duration": 25,
        "date": "Sun Sep 06 2020"
      },
      {
        "description": "Ejercicio 1",
        "duration": 25,
        "date": "Sun Sep 06 2020"
      }
    ]
  }
  Requires at least one ID in the params. Returns the count and the exercises. It also admits filters.
 */
app.get("/api/exercise/log", function(req, res) {

  //req.query.first
  res.redirect(savedURLs[req.params.identifier]);

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
