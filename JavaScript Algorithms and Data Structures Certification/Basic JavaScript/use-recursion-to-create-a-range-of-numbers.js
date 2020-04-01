function rangeOfNumbers(startNum, endNum) {
  if(startNum > endNum) {
    return [];
  } else {
    const tempArray = rangeOfNumbers(startNum, endNum - 1);
    tempArray.push(endNum);
    return tempArray;
  }
};
