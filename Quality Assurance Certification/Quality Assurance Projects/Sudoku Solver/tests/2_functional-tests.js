/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST to /api/solve', () => {
    test('Solvable puzzle posted returns completed puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'

      chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"puzzle": input})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, output);
          done();
      });
    });

    test('Puzzle Field Missing', done => {
      const output = { error: 'Required field missing' };
      chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"notPuzzle": "hello"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, output.error);
          done();
      });
    });

    test('Invalid Characters in Puzzle', done => {
      const output = { error: 'Invalid characters in puzzle' };
      const input = '..9..5.1.85.4....2432.HA!..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      chai.request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });

    test('Puzzle incorrect length', done => {
      const output = { error: 'Expected puzzle to be 81 characters long' };
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9...1945....4.37.4.3..6..'
      chai.request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });

    test('Puzzle Cannot be Solved', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const output = { error: 'Puzzle cannot be solved' };
      chai.request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });
  });
  
  suite('POST to /api/check', () => {
    
    test('All fields filled in correctly, valid placement', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "7";
      const response = {valid: true};
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isTrue(res.body.hasOwnProperty("valid"));
        assert.isTrue(res.body.valid);
        done();
      });
    })

    test('All fields filled in correctly, invalid placement, single conflict', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A2";
      const value = "1";
      const response = {valid: false, conflict: [ 'row' ]};
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.isTrue(res.body.hasOwnProperty("valid") && response.valid == res.body.valid);
        assert.isTrue(res.body.hasOwnProperty("conflict"));
        assert.equal(res.body.conflict.length, 1);
        assert.isTrue(res.body.conflict.includes(response.conflict[0]));
        done();
      });
    })

    test('All fields filled in correctly, invalid placement, multiple conflicts', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "1";
      const response = {valid: false, conflict: [ 'row', 'column' ]};
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.isTrue(res.body.hasOwnProperty("valid") && response.valid == res.body.valid);
        assert.isTrue(res.body.hasOwnProperty("conflict"));
        assert.equal(res.body.conflict.length, 2);
        assert.isTrue(res.body.conflict.includes(response.conflict[0]));
        assert.isTrue(res.body.conflict.includes(response.conflict[1]));
        done();
      });
    })

    test('All fields filled in correctly, invalid placement, all conflicts', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "5";
      const response = {valid: false, conflict: [ 'row', 'column', 'region' ]};
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.isTrue(res.body.hasOwnProperty("valid") && response.valid == res.body.valid);
        assert.isTrue(res.body.hasOwnProperty("conflict"));
        assert.equal(res.body.conflict.length, 3);
        assert.isTrue(res.body.conflict.includes(response.conflict[0]));
        assert.isTrue(res.body.conflict.includes(response.conflict[1]));
        assert.isTrue(res.body.conflict.includes(response.conflict[2]));
        done();
      });
    })

    test('Required Field(s) Missing', done => {
      const output = { error: 'Required field(s) missing' };
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"notPuzzle": "Hello!"})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });

    test('Invalid Characters in Puzzle', done => {
      const output = { error: 'Invalid characters in puzzle' };
      const input = '..9..5.1.85.4....2432.HA!..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const coordinate = "A1";
      const value = "5";
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });

    test('Puzzle incorrect length', done => {
      const output = { error: 'Expected puzzle to be 81 characters long' };
      const input = "..9..5.1.85.4....2432...123213123123213...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "5";
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });

    test('Coordinate Out of Bounds', done => {
      const coordinate1 = "K1";
      const coordinate2 = "A11";
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const value = "5";
      const output = { error: 'Invalid coordinate'};
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate1, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
      });
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate2, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
      });
      done();
    })

    test('Invalid Value', done => {
      const input = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      const coordinate = "A1";
      const value = "12";
      const output = { error: 'Invalid value' };
      chai.request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({"puzzle": input, "coordinate": coordinate, "value": value})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.body.error, output.error);
        done();
      });
    });
  });
});

