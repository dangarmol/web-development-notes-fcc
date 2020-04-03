let quoteSample = "The five boxing wizards jump quickly.";
let nonAlphabetRegex = /\W/ig; // Change this line
let result = quoteSample.match(nonAlphabetRegex).length;
