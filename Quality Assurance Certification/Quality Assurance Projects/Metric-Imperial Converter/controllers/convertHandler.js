function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /[a-zA-Z]/;
    const slicedInput = input.slice(0, input.search(regex));
    let evaluatedInput = eval(slicedInput);
    
    if(slicedInput.includes("//")) {
      evaluatedInput = null;
    }

    if(slicedInput == "") {
      return 1;
    } else if(evaluatedInput == null || isNaN(evaluatedInput)) {
      return "invalid";
    } else {
      return this.roundTo5(evaluatedInput);
    }
  };
  
  this.getUnit = function(input) {
    const regex = /[a-zA-Z]/;
    const units = ["gal", "l", "lbs", "kg", "mi", "km"];
    const slicedInput = input.slice(input.search(regex)).toLowerCase();

    if(units.includes(slicedInput)) {
      return slicedInput;
    } else {
      return "invalid";
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      "gal": "l",
      "l": "gal",
      "lbs": "kg",
      "kg": "lbs",
      "mi": "km",
      "km": "mi"
    }

    return unitPairs[initUnit]
  };

  this.spellOutUnit = function(unit) {
    const units = {
      "gal": "gallons",
      "l": "liters",
      "lbs": "pounds",
      "kg": "kilograms",
      "mi": "miles",
      "km": "kilometers"
    }
    
    return units[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitToFactor = {
      "gal": galToL,
      "l": (1 / galToL),
      "lbs": lbsToKg,
      "kg": (1 / lbsToKg),
      "mi": miToKm,
      "km": (1 / miToKm)
    }
    
    return this.roundTo5(unitToFactor[initUnit] * initNum);
  };

  this.roundTo5 = function(number) {
    const hasDecimals = number.toString().split(".").length > 1;
    if (hasDecimals) {
      return number.toString().split(".")[1].length <= 5 ? parseFloat(number) : parseFloat(number.toFixed(5));
    } else {
      return parseFloat(number);
    }
  }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${this.roundTo5(initNum)} ${this.spellOutUnit(initUnit)} converts to ${this.roundTo5(returnNum)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
