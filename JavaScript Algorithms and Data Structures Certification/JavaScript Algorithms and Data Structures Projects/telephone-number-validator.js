function telephoneCheck(str) {
  const cyphers = str.match(/\d/g);
  const splitString = str.split("");
  if(!(cyphers.length == 10 || (cyphers.length == 11 && cyphers[0] == 1))) {
    // Checks for number length and prefix.
    return false;
  }
  if(splitString.indexOf("(") != -1 || splitString.indexOf(")") != -1) {
    // There is at least one parenthesis.
    if(splitString.indexOf("(") != splitString.indexOf(")") - 4 || splitString.indexOf(")") <= 3) {
      return false;
    }
  }
  if(str.match(/[^0-9-()\s]/g) != null || str.match(/^[^0-9(]|[^0-9]$/g) != null) {
    // Checks for invalid characters and wrong hyphens.
    return false;
  }
  return true;
}

console.log(telephoneCheck("1 456 789 4444"));

/* 
   Alternative solution:
   var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
   return regex.test(str);
*/