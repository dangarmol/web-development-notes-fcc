class SudokuSolver {

  constructor() {
    this.puzzleArray = null;
    this.solutionFound = false;
  }

  // Board coordinates:
  // / 1 2 3 4 5 6 7 8 9 \
  // A x x x x x x x x x 0
  // B x x x x x x x x x 1
  // C x x x x x x x x x 2
  // D x x x x x x x x x 3
  // E x x x x x x x x x 4
  // F x x x x x x x x x 5
  // G x x x x x x x x x 6
  // H x x x x x x x x x 7
  // I x x x x x x x x x 8
  // \ 0 1 2 3 4 5 6 7 8 /

  checkPlacement(puzzleArray, index, value) {
    const row = Math.floor(index / 9);
    const col = index % 9;

    return this.checkRowPlacement(puzzleArray, row, value) &&
           this.checkColPlacement(puzzleArray, col, value) &&
           this.checkRegionPlacement(puzzleArray, row, col, value);
  }

  // RETURN EXAMPLES:
  // { "valid": true }
  // { "valid": false, "conflict": [ "row", "column", "region" ] }
  checkPlacementJSON(puzzleString, coordinate, value) {
    const rowsIndex = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5, "G":6, "H":7, "I":8};
    const puzzleArray = puzzleString.split("");
    const trueRow = rowsIndex[coordinate[0]];
    const trueColumn = coordinate[1] - 1;
    let conflicts = [];

    if(!this.checkRowPlacement(puzzleArray, trueRow, value)) conflicts.push("row");
    if(!this.checkColPlacement(puzzleArray, trueColumn, value)) conflicts.push("column");
    if(!this.checkRegionPlacement(puzzleArray, trueRow, trueColumn, value)) conflicts.push("region");

    let result = {};
    result["valid"] = (conflicts.length == 0);
    if(!result["valid"]) {
      result["conflict"] = conflicts;
    }

    return result;
  }
  
  checkRowPlacement(puzzleArray, row, value) {
    const startIndex = row * 9;
    const rowContents = puzzleArray.slice(startIndex, startIndex + 9);
    return (!rowContents.includes(value.toString()));
  }

  checkColPlacement(puzzleArray, column, value) {
    let columnContents = [];
    for (let i = column; i < puzzleArray.length; i += 9) {
      columnContents.push(puzzleArray[i]);
    }
    return (!columnContents.includes(value.toString()));
  }

  // Regions will be determined in the following manner.
  // Initial square for each region is marked with an "X".
  // X 0 0 X 1 1 X 2 2
  // 0 0 0 1 1 1 2 2 2
  // 0 0 0 1 1 1 2 2 2
  // X 3 3 X 4 4 X 5 5
  // 3 3 3 4 4 4 5 5 5
  // 3 3 3 4 4 4 5 5 5
  // X 6 6 X 7 7 X 8 8
  // 6 6 6 7 7 7 8 8 8
  // 6 6 6 7 7 7 8 8 8
  checkRegionPlacement(puzzleArray, row, column, value) {
    const offsetRow = row % 3;
    const offsetColumn = column % 3;
    const regionInitial = (row - offsetRow) * 9 + (column - offsetColumn);

    // This is probably more easily readable than a for loop.
    let regionContents = puzzleArray.slice(regionInitial, regionInitial + 3);
    regionContents += puzzleArray.slice(regionInitial + 9, regionInitial + 12);
    regionContents += puzzleArray.slice(regionInitial + 18, regionInitial + 21);

    return (!regionContents.includes(value.toString()));
  }

  solveString(puzzleString) {
    this.puzzleArray = puzzleString.split("");
    this.solutionFound = false;
    this.solve();
  }

  solve() {
    if (!this.solutionFound) {
      for (let index = 0; index < this.puzzleArray.length; index++) {
        if (this.puzzleArray[index] === ".") {
          for (let number = 1; number <= 9; number++) {
            if (this.checkPlacement(this.puzzleArray)) {
  
            }
          }
        }
      }
    }
  }
}

module.exports = SudokuSolver;