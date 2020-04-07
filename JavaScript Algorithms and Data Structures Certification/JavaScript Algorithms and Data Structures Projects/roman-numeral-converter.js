function convertToRoman(number) {  
  let roman = "";  
  //Block 1: Values 3999-1000
  while(number >= 1000) { //The numbers at this point MUST be lower than 3999. This loop can iterate up to 3 times.
    number -= 1000;
    roman += "M";
  }

  //Block 2: Values 999-100
  //Only one of the following three conditions can be met.
  if(number >= 900) {
    number -= 900;
    roman += "CM";
  } else if(number >= 500) {
    number -= 500;
    roman += "D";
  } else if(number >= 400) {
    number -= 400;
    roman += "CD";
  }
  while(number >= 100) { //The numbers at this point MUST be lower than 399. This loop can iterate up to 3 times.
    number -= 100;
    roman += "C";
  }

  //Block 3: Values 99-10
  //Only one of the following three conditions can be met.
  if(number >= 90) {
    number -= 90;
    roman += "XC";
  } else if(number >= 50) {
    number -= 50;
    roman += "L";
  } else if(number >= 40) {
    number -= 40;
    roman += "XL";
  }
  while(number >= 10) { //The numbers at this point MUST be lower than 39. This loop can iterate up to 3 times.
    number -= 10;
    roman += "X";
  }

  //Block 4: Values 9-1
  //Only one of the following three conditions can be met.
  if(number >= 9) {
    number -= 9;
    roman += "IX";
  } else if(number >= 5) {
    number -= 5;
    roman += "V";
  } else if(number >= 4) {
    number -= 4;
    roman += "IV";
  }
  while(number >= 1) { //The numbers at this point MUST be lower than 3. This loop can iterate up to 3 times.
    number -= 1;
    roman += "I";
  }
  
  return roman;
}

console.log(convertToRoman(36));