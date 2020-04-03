let username = "JackOfAllTrades";
let userCheck = /^[a-z](\d\d+|[a-z]+\d*)$/i; // Change this line
let result = userCheck.test(username);
