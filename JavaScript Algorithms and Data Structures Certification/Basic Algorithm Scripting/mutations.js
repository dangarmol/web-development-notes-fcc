function mutation(arr) {
  let first = arr[0].toLowerCase().split("");
  let second = arr[1].toLowerCase().split("");
  return second.every(val => first.includes(val));
}

mutation(["hello", "hey"]);
