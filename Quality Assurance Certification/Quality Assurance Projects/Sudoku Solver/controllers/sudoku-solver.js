class SudokuSolver {

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

  rowsIndex = {"A":0, "B":1, "C":2, "D":3, "E":4, "F":5, "G":6, "H":7, "I":8};

  checkPlacement(puzzleString, coordinate, value) {
    return this.checkRowPlacement(puzzleString, coordinate[0], value) &&
           this.checkColPlacement(puzzleString, coordinate[1], value) &&
           this.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value);
  }

  // RETURN EXAMPLES:
  // { "valid": true }
  // { "valid": false, "conflict": [ "row", "column", "region" ] }
  checkPlacementJSON(puzzleString, coordinate, value) {
    let conflicts = [];
    if(!this.checkRowPlacement(puzzleString, coordinate[0], value)) conflicts.push("row");
    if(!this.checkColPlacement(puzzleString, coordinate[1], value)) conflicts.push("column");
    if(!this.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value)) conflicts.push("region");

    let result = {};
    result["valid"] = (conflicts.length == 0);
    if(!result["valid"]) {
      result["conflict"] = conflicts;
    }

    return result;
  }
  
  checkRowPlacement(puzzleString, row, value) {
    const startIndex = this.rowsIndex[row] * 9;
    const rowContents = puzzleString.slice(startIndex, startIndex + 9);
    return (!rowContents.includes(value.toString()));
  }

  checkColPlacement(puzzleString, column, value) {
    let columnContents = [];
    for (let i = (column - 1); i < puzzleString.length; i += 9) {
      columnContents.push(puzzleString[i]);
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
  checkRegionPlacement(puzzleString, row, column, value) {
    const trueRow = this.rowsIndex[row];
    const trueColumn = column - 1;
    const offsetRow = trueRow % 3;
    const offsetColumn = trueColumn % 3;
    const regionInitial = (trueRow - offsetRow) * 9 + (trueColumn - offsetColumn);

    // This is probably more easily readable than a for loop.
    let regionContents = puzzleString.slice(regionInitial, regionInitial + 3);
    regionContents += puzzleString.slice(regionInitial + 9, regionInitial + 12);
    regionContents += puzzleString.slice(regionInitial + 18, regionInitial + 21);

    return (!regionContents.includes(value.toString()));
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;
