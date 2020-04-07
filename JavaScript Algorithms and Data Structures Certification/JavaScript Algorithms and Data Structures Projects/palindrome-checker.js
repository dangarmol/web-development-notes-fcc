function palindrome(str) {
  let chars = str.toLowerCase().match(/[a-z0-9]/g);
  let result = true;
  for(let off = 0; off < (chars.length / 2) + 1; off++){
    if(chars[off] != chars[chars.length - off - 1]) {
      return false;
    }
  }
  console.log(chars);
  return result;
}

console.log(palindrome("race car"));
console.log(palindrome("A man, a plan, a canal. Panama"));