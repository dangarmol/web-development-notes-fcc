function addTogether() {
  let args = Array.from(arguments);
  if(typeof args[0] !== "number")
    return undefined;
  if(args.length == 1) {
    return function(n) {
      if(typeof n !== "number")
        return undefined;
      return args[0] + n;
    };
  }
  if(typeof args[1] !== "number")
    return undefined;

  return args[0] + args[1];
}

console.log(addTogether(2,"3"));
