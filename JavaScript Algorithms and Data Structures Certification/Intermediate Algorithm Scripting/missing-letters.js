function fearNotLetter(str) {
  let current = -1; // First letter not found yet.
  for (let i = 0; i < 26; i++) {
    if(current != -1) {
      // Found the first letter in the previous iteration.
      current++;
      if((i+10).toString(36) != str[current]) {
        return (i+10).toString(36);
      }
    } else if((i+10).toString(36) == str[0]) {
      current = 0;
    }
  }
  return undefined;
}

console.log(fearNotLetter("abce"));
