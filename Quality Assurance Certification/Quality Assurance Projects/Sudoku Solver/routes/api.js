'use strict';

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route("/api/check")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String, "coordinate": String, "value": String }

      console.log("POST on CHECK");

      res.json(solver.checkPlacementJSON(req.body.puzzle, req.body.coordinate, req.body.value));
    });
    
  app.route("/api/solve")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String }

      console.log("POST on SOLVE");

      const solution = solver.solveString(req.body.puzzle);

      if (solution) {
        res.json({"solution": solution});
      } else {
        res.json({"error": "Puzzle cannot be solved"});
      }
    });
};
