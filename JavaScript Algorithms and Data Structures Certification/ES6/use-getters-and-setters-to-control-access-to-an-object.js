// Only change code below this line
class Thermostat {
  constructor(temperature) {
    this._temperature = temperature;
  }
  // getter
  get temperature() {
    return 5/9 * (this._temperature - 32);
  }
  // setter
  set temperature(temperature) {
    this._temperature = temperature;
  }
}
// Only change code above this line

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius
