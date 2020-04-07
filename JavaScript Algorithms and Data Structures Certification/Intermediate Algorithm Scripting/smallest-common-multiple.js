function smallestCommons(arr) {
  let min = Math.min(arr[0], arr[1]);
  let max = Math.max(arr[0], arr[1]);
  let total = max;

  for(let i = max - 1; i >= min; i--) {
    if(total % i != 0) {
      total += max;
      i = max;
    }
  }

  return total;
}

console.log(smallestCommons([1,5]));