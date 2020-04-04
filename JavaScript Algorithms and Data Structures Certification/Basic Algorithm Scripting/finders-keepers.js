function findElement(arr, func) {
  for (let item of arr) {
    if(func(item)) return item;
  }
  return undefined;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);
