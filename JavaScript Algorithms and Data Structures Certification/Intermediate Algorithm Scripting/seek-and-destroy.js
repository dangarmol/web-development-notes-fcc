function destroyer(arr) {
  let args = Array.from(arguments);
  
  return arr.filter(elem => !args.includes(elem));
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
