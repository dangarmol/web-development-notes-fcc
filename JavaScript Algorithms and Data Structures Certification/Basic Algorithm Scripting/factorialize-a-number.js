function factorialize(num) {
  let result = 1;
  while(num > 1) {
    result *= num;
    num--;
  }
  return result;
}

factorialize(5);
