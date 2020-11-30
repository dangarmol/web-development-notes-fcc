'use strict';

module.exports = function (app) {

  const mongoose = require('mongoose')
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const Schema = mongoose.Schema;

  const bookSchema = new Schema({
    //_id: "5871dda29faedc3491ff93bb"
    title: {type: String, required: true},
    comments: [String],
    commentcount: {type: Number, default: 0}
  }, { versionKey: false });

  let Book = mongoose.model("Book", bookSchema, "personal-library");

  app.route('/api/books')
    .get(function (req, res){
      console.log("GET all books on /api/books");

      Book.find({}).exec(function (err, data) {
        if (err) return console.log(err);
        res.json(data);
      });
    })
    
    .post(async (req, res) => {
      const title = req.body.title;
      console.log("POST on /api/books");
      console.log(req.body);

      if (!req.body.hasOwnProperty("title")) {
        res.send("missing required field title");
        return;
      }

      let newBookJSON = {
        "title": title,
        "comments": [],
        "commentcount": 0
      };

      const newBook = new Book(newBookJSON);
  
      await newBook.save({new:true}, function(err, data) {
        if (err) return console.error(err);
        let responseJSON = {"_id": data._id, "title": data.title};
        res.json(responseJSON);
      });
    })
    
    .delete(function(req, res){
      console.log("DELETE all books on /api/books");

      Book.deleteMany({}, function(err) {
        if (err) return console.error(err);
        res.send("complete delete successful");
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      console.log("GET one book with ID: " + req.params.id);
      let bookid = req.params.id;

      Book.find({"_id": bookid}).exec(function (err, data) {
        if (err) return console.log(err);
        if (data.length < 1) {
          res.send("no book exists")
        } else {
          res.json(data[0]);
        }
      });
    })
    
    .post(function(req, res){
      console.log("POST one comment on ID: " + req.params.id);
      console.log(req.body);

      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!req.body.hasOwnProperty("comment")) {
        res.send("missing required field comment");
        return;
      }

      Book.find({"_id": bookid}).exec(function (err, data) {
        if (err) return console.log(err);
        if (data.length < 1) {
          res.send("no book exists")
        } else {
          Book.findOneAndUpdate({ "_id": bookid }, { $push: { comments: comment } }, {new: true}, function (err, data) {
            if (err) return console.log(err);
            Book.find({"_id": bookid}).exec(function (err, data) {
              if (err) return console.log(err);
              res.json(data[0]);
            });
          });
        }
      });
    })
    
    .delete(function(req, res){
      console.log("DELETE one book with ID: " + req.params.id);
      let bookid = req.params.id;

      Book.find({"_id": bookid}).exec(function (err, data) {
        if (err) return console.log(err);
        if (data.length < 1) {
          res.send("no book exists")
        } else {
          Book.findOneAndDelete({ "_id": bookid }, function (err) {
            if (err) return console.log(err);
            res.send("delete successful");
          });
        }
      });
    });
};
