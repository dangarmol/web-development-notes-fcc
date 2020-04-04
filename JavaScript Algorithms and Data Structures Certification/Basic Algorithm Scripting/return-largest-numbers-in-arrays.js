function largestOfFour(arr) {
  let sol = [];
  for(let subArr of arr) {
    sol.push(Math.max(...subArr));
  }
  return sol;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
