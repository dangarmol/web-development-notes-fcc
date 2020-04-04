function titleCase(str) {
  let sol = [];

  for(let word of str.split(" ")) {
    let add = word.length > 1 ? word.slice(1).toLowerCase() : "";
    sol.push(word[0].toUpperCase() + add);
  }
  
  return sol.join(" ");
}

titleCase("I'm a little tea pot");
