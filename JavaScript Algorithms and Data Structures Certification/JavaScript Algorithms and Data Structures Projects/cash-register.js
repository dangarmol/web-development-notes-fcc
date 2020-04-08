const UNITS = {"ONE HUNDRED": 100, "TWENTY": 20, "TEN": 10, "FIVE": 5, "ONE": 1, "QUARTER": 0.25, "DIME": 0.1, "NICKEL": 0.05, "PENNY": 0.01};

/*
  This function could be improved by creating a specific
  object to store cash in units and decimals. It would
  avoid using any "< 0.1" checks and improve robustness.
*/
function calculateChange(change, cid) {
  let improvedCid = {};
  let cashLeft = 0;
  for(let item of cid) {
    improvedCid[item[0]] = item[1];
    cashLeft += item[1];
  }

  let changeArray = [];
  for(let value in UNITS) {
    if(change < UNITS[value]) {
      continue;
    } else {
      let thisCoin = [value, 0];
      do {
        if(thisCoin[1] * UNITS[value] + UNITS[value] <= improvedCid[value]) {
          change -= UNITS[value];
          cashLeft -= UNITS[value];
          thisCoin[1]++;
        } else {
          break;
        }
      } while(change >= UNITS[value]);
      if(thisCoin[0] == "PENNY" && change > 0 && change < 0.1 && improvedCid["PENNY"] != 0) {
        change = 0;
        cashLeft -= 0.1;
        thisCoin[1]++;
      }
      if(thisCoin[1] > 0) {
        thisCoin[1] *= UNITS[value];
        changeArray.push(thisCoin);
      }
    }
  }
  let response = [];
  if(change == 0) {
    if(cashLeft < 0.1) {
      response.push("CLOSED");
      response.push(cid);
    } else {
      response.push("OPEN");
      response.push(changeArray);
    }
  } else {
    response[0] = "INSUFFICIENT_FUNDS";
    response[1] = [];
  }
  return response;
}

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let result = Object();
  let calculation = calculateChange(change, cid);
  result.status = calculation[0];
  result.change = calculation[1];
  return result;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
