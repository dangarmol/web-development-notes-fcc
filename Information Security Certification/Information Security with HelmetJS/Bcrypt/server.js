'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const bcrypt      = require("bcrypt");

const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

// Synchronous Hashing:
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
   console.log(hash);

   bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      console.log(res); //true
   });

   bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
      console.log(res); //false
   });
});

// Asynchronous Hashing:
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);

app.listen(process.env.PORT || 3000, () => {});
