function sumAll(arr) {
  let sum = 0;
  
  for(let num = arr[0]; num != arr[1]; arr[0] > arr[1] ? num-- : num++) {
    sum += num;
  }

  return sum += arr[1];
}

console.log(sumAll([1, 4]));
