function findLongestWordLength(str) {
  let max = 0;
  for(const word of str.split(" ")) {
    if(word.length > max) {
      max = word.length;
    }
  }
  return max;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");
