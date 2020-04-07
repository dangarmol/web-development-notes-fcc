function sumFibs(num) {
  let memory = [1, 1];
  let sum = 1;
  let i = 1;

  while(memory[i] <= num) {
    memory.push(memory[i] + memory[i - 1]);
    if(memory[i] % 2 == 1) {
      console.log(memory[i]);
      sum += memory[i];
    }
    i++;
  }

  return sum;
}

console.log("New " + sumFibs(10));

function fibonacciSum(num) {
  let memory = [1, 1];

  for(let i = 2; i <= num; i++) {
    memory.push(memory[i - 1] + memory[i - 2]);
  }

  return memory[num];
}

console.log("DynMem " + fibonacciSum(10));

function fibonacci(num) {
  if(num == 0 || num == 1) {
    return 1;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

console.log("Orig " + fibonacci(10));

// f(0) = 1
// f(1) = 1
// f(n) = f(n - 1) + f(n - 2)