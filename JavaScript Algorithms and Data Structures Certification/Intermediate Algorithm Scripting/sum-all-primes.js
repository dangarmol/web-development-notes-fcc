function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function sumPrimes(num) {
  let sum = isPrime(num) ? num : 0;
  for(let n = 2; n < num; n++) {
    if(isPrime(n)) {
      console.log(n);
      sum += n;
    }
  }
  return sum;
}

console.log(sumPrimes(10));
console.log(sumPrimes(977));