'use strict';

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route("/api/check")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String, "coordinate": String, "value": String }

      console.log("POST on CHECK");

      if (!solver.validateCheckFields(req.body)) {
        res.json({"error": "Required field(s) missing"});
      } else if (!solver.validatePuzzleLength(req.body.puzzle)) {
        res.json({"error": "Expected puzzle to be 81 characters long"});
      } else if (!solver.validateCoordinate(req.body.coordinate)) {
        res.json({"error": "Invalid coordinate"});
      } else if (!solver.validateValue(req.body.value)) {
        res.json({"error": "Invalid value"});
      } else if (!solver.validatePuzzleCharacters(req.body.puzzle)) {
        res.json({"error": "Invalid characters in puzzle"});
      } else {
        res.json(solver.checkPlacementJSON(req.body.puzzle, req.body.coordinate, req.body.value));
      }
    });
    
  app.route("/api/solve")
    .post((req, res) => {
      // Body structure:
      // { "puzzle": String }

      console.log("POST on SOLVE");

      if (!solver.validateSolveFields(req.body)) {
        res.json({"error": "Required field missing"});
      } else if (!solver.validatePuzzleLength(req.body.puzzle)) {
        res.json({"error": "Expected puzzle to be 81 characters long"});
      } else if (!solver.validatePuzzleCharacters(req.body.puzzle)) {
        res.json({"error": "Invalid characters in puzzle"});
      } else {
        const solution = solver.solveString(req.body.puzzle);
        if (solution) {
          res.json({"solution": solution});
        } else {
          res.json({"error": "Puzzle cannot be solved"});
        }
      }
    });
};
