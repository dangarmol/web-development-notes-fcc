function countOnline(usersObj) {
  // Only change code below this line
  let userCount = 0;
  for(let user in usersObj) {
    if(usersObj[user].online) {
      userCount++;
    }
  }
  return userCount;
  // Only change code above this line
}
