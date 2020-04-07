function truthCheck(collection, pre) {
  for(let item of collection) {
    if(!item[pre]) return false;
  }
  return true;
}

console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));
