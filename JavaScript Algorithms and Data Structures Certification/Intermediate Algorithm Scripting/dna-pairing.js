function pairElement(str) {
  
  let solution = [];
  for(let elem of str.split("")) {
    let pair = [];
    pair.push(elem);
    if(elem == "A" || elem == "T") {
      pair.push(elem == "A" ? "T" : "A");
    } else {
      pair.push(elem == "C" ? "G" : "C");
    }
    solution.push(pair);
  }
  return solution;
}

console.log(pairElement("GCG"));
