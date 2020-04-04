function bouncer(arr) {
  let sol = [];
  for(let elem of arr) {
    if(elem) sol.push(elem);
  }
  return sol;
}

bouncer([7, "ate", "", false, 9]);
