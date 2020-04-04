function getIndexToIns(arr, num) {
  let index = 0;
  arr.forEach(function (elem) {
    if(elem < num) index++;
  });
  return index;
}

getIndexToIns([40, 60], 50);
