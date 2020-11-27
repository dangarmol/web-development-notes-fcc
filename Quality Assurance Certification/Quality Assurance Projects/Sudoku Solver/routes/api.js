'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log("POST on CHECK, body:");
      console.log(req.body);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log("POST on SOLVE, body:");
      console.log(req.body);
    });
};
