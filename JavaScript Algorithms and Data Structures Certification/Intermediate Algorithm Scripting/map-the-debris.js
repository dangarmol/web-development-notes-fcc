function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var solution = [...arr];
  solution.forEach(item => {
    item.orbitalPeriod = Math.round(2 * Math.PI * Math.sqrt((Math.pow(earthRadius + item.avgAlt, 3) / GM)));
    delete item.avgAlt;
  });

  return solution;
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));
