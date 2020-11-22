/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'l'); // The returned units should always be lowercase according to the example!
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test("Convert 32g (invalid input unit)", function(done) {
        chai.request(server)
        .get("/api/convert")
        .query({input: "32g"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "invalid unit");
          done();
        });
      });
      
      // Testing for 3/7.2/4kg doesn't make sense as that can be a valid number.
      // The example API also takes it as legal.
      test("Convert 3//4kg (invalid number)", function(done) {
        chai.request(server)
        .get("/api/convert")
        .query({input: "3//4kg"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "invalid number");
          done();
        });
      });  
      
      test("Convert 3//4kilomegagram (invalid number and unit)", function(done) {
        chai.request(server)
        .get("/api/convert")
        .query({input: "3//4kilomegagram"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "invalid number and unit");
          done();
        });
      });
      
      test("Convert kg (no number)", function(done) {
        chai.request(server)
        .get("/api/convert")
        .query({input: "kg"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg"); // The returned units should always be lowercase according to the example!
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, "lbs");
          done();
        });
      });
      
    });

  });

});
