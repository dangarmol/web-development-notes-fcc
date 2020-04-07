function whatIsInAName(collection, source) {
  var arr = [];
  // Only change code below this line
  let keys = Object.keys(source);

  for(let elem of collection) {
    let valid = true;
    for(let key of keys) {
      if(!elem.hasOwnProperty(key)) {
        valid = false;
        break;
      } else if(elem[key] != source[key]) {
        valid = false;
        break;
      } else {
        continue;
      }
    }
    if(valid) {
      arr.push(elem);
    }
  }
  
  // Only change code above this line
  return arr;
}

console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" })); // [{ first: "Tybalt", last: "Capulet" }]

console.log(whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 })); // [{ "apple": 1, "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }]
