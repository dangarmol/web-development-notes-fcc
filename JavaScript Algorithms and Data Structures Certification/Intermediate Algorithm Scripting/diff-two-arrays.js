function diffArray(arr1, arr2) {
  let joint = arr1.concat(arr2).sort();
  let solution = [];

  console.log(joint);
  for(let i = 0; i < joint.length; i++) {
    if(i == 0 && joint.length > 1) {
      if(joint[i] != joint[i + 1]) solution.push(joint[i]);
    } else if(i == joint.length && joint.length > 1) {
      if(joint[i] != joint[i - 1]) solution.push(joint[i]);
    } else if(joint[i] != joint[i - 1] && joint[i] != joint[i + 1]) {
      solution.push(joint[i]);
    }
  }

  return solution;
}

console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]));
console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));
