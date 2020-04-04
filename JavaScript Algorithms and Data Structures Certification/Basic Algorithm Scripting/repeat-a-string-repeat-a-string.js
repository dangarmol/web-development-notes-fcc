function repeatStringNumTimes(str, num) {
  let sol = "";
  for(let i = 0; i < num; i++) {
    sol += str;
  }
  return sol;
}

repeatStringNumTimes("abc", 3);
