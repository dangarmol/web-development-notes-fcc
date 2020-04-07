function recursiveSteamroll(arr, solution) {
  for(let elem of arr) {
    if(!Array.isArray(elem)) {
      solution.push(elem);
    } else {
      recursiveSteamroll(elem, solution);
    }
  }
}

function steamrollArray(arr) {
  let solution = [];
  for(let elem of arr) {
    if(!Array.isArray(elem)) {
      solution.push(elem);
    } else {
      recursiveSteamroll(elem, solution);
    }
  }
  return solution;
}

console.log(steamrollArray([1, [2], [3, [[4]]]]));
