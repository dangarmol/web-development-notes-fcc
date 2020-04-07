const SPLIT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function rot13(str) {
  let solution = "";
  for(let char of str.split("")) {
    let index = SPLIT_ALPHABET.indexOf(char);
    if(index != -1) {
      solution += SPLIT_ALPHABET[index + 13 < SPLIT_ALPHABET.length ? index + 13 : index + 13 - SPLIT_ALPHABET.length];
    } else {
      solution += char;
    }
  }
  return solution;
}

console.log(rot13("SERR PBQR PNZC!"));
