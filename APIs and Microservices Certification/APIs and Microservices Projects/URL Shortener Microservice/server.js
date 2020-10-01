'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Persistency should ideally be made on a Database, not an array.
// This is just a quick prototype to handle POST requests.
// I know this is terrible and feel bad for it. :(
let savedURLs = [];
let nextURL = 0;

// HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
app.post("/api/shorturl/new", function (req, res) {
  
  if(!savedURLs.includes(req.body.url)) {
    savedURLs[nextURL] = req.body.url;
    nextURL++; 
  }

  res.json({"original_url": req.body.url, "short_url": savedURLs.indexOf(req.body.url)});
  
});

app.get("/api/shorturl/:identifier", function(req, res) {
  
  res.redirect(savedURLs[req.params.identifier]);

});


app.listen(port, function () {
  console.log('Node.js listening ...');
});