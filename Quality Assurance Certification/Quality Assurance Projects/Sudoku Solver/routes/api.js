'use strict';

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route("/api/check")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String, "coordinate": String, "value": String }

      console.log("POST on CHECK");

      if (!req.body.hasOwnProperty("puzzle") || !req.body.hasOwnProperty("coordinate") || !req.body.hasOwnProperty("value")) {
        res.json({"error": "Required field(s) missing"});
      } else if (req.body.puzzle.length != 81) {
        res.json({"error": "Expected puzzle to be 81 characters long"});
      } else if (!req.body.coordinate.match(/^[A-I][1-9]$/gmi)) {
        res.json({"error": "Invalid coordinate"});
      } else if (isNaN(req.body.value) || req.body.value > 9 || req.body.value < 1) {
        res.json({"error": "Invalid value"});
      } else {
        for (const char of req.body.puzzle) {
          if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(char)) {
            res.json({"error": "Invalid characters in puzzle"});
            return;
          }
        }
        res.json(solver.checkPlacementJSON(req.body.puzzle, req.body.coordinate, req.body.value));
      }
    });
    
  app.route("/api/solve")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String }

      console.log("POST on SOLVE");

      if (!req.body.hasOwnProperty("puzzle")) {
        res.json({"error": "Required field missing"});
      } else if (req.body.puzzle.length != 81) {
        res.json({"error": "Expected puzzle to be 81 characters long"});
      } else {
        for (const char of req.body.puzzle) {
          if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(char)) {
            res.json({"error": "Invalid characters in puzzle"});
            return;
          }
        }
        const solution = solver.solveString(req.body.puzzle);
        if (solution) {
          res.json({"solution": solution});
        } else {
          res.json({"error": "Puzzle cannot be solved"});
        }
      }
    });
};
