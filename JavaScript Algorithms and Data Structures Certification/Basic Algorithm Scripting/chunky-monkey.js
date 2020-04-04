function chunkArrayInGroups(arr, size) {
  let solution = [];
  let chunkSize = 0;
  let chunk = [];

  for(let elem of arr) {
    if(chunkSize < size) {
      chunk.push(elem);
      chunkSize++;
    } else {
      solution.push(chunk);
      chunk = [];
      chunk.push(elem);
      chunkSize = 1;
    }
  }
  if(chunk.length > 0) {
    solution.push(chunk);
  }
  console.log(solution);
  return solution;
}

chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3);
