function frankenSplice(arr1, arr2, n) {
  let sol = [...arr2];
  sol.splice(n, 0, ...arr1);
  console.log(sol);
  return sol;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);
