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


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const Schema = mongoose.Schema;

const personSchema = new Schema({
  username:  {type: String, required: true},
  log:  [
          {
            description: String,
            duration: Number,
            date: Date
          }
        ]
});

var Person = mongoose.model("Person", personSchema);

function personExistsByName(nameToSearch) {
  Person.exists({ name: nameToSearch }, function(err, result) {
    if (err) {
      console.log(err);
      return err;
    } else {
      return result;
    }
  });
}

/**
 * Return:
 * an object with username and _id
    {
      "username": "dandandan",
      "_id": "5f7cbec6ebd65c0039866141"
    }

  If taken, return "Username already taken"
*/
app.post("/api/exercise/new-user", function (req, res) {
  
  if(personExistsByName(req.body.uname)) {
    res.json({"error": "Username already exists!"});
  } else {
    // Insert into database
    res.json({"username": req.body.uname, "_id": "testtesttest"});
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
app.post("/api/exercise/add", function (req, res) {
  
  if(!savedURLs.includes(req.body.url)) {
    savedURLs[nextURL] = req.body.url;
    nextURL++; 
  }

  res.json({"original_url": req.body.url, "short_url": savedURLs.indexOf(req.body.url)});
  
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
