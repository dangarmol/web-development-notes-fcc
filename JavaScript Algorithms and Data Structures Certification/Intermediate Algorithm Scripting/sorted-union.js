function uniteUnique(arr) {
  let args = Array.from(arguments);
  let solution = [];
  for(let subArr of args) {
    for(let num of subArr) {
      if(!solution.includes(num)) {
        solution.push(num);
      }
    }
  }
  return solution;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
