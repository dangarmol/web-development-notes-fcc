const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let validID = null;
const notValidID = "5fc55dc5ea32b206c8ee9dfb";

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: "Booktitle"
          })
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.property(res.body, "title");
          assert.property(res.body, "_id");

          assert.equal(res.body.title, "Booktitle");
          validID = res.body._id;
          done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            noTitle: "noTitle"
          })
          .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "missing required field title");
          done();
        });
      });
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
        });
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/' + notValidID)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, "no book exists");
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/' + validID)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body, 'title', 'Books in array should contain title');
          assert.property(res.body, '_id', 'Books in array should contain _id');
          done();
        });
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/' + validID)
          .send({
            comment: "What a cool book!"
          })
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.isArray(res.body.comments, 'response should be an array');
          assert.isTrue(res.body.comments.includes("What a cool book!"));
          assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body, 'title', 'Books in array should contain title');
          assert.property(res.body, '_id', 'Books in array should contain _id');
          done();
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post('/api/books/' + validID)
          .send({
            noComment: "What a cool book!"
          })
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.equal(res.text, "missing required field comment");
          done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post('/api/books/' + notValidID)
          .send({
            comment: "What a cool book!"
          })
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.equal(res.text, "no book exists");
          done();
        });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete('/api/books/' + validID)
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.equal(res.text, "delete successful");
          done();
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete('/api/books/' + notValidID)
          .end(function(err, res){
          assert.equal(res.status, 200);

          assert.equal(res.text, "no book exists");
          done();
        });
      });
    });
  });
});
