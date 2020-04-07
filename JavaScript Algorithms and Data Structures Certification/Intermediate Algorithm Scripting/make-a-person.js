var Person = function(firstAndLast) {
  var _first = firstAndLast.split(" ")[0];
  var _last = firstAndLast.split(" ")[1];

  this.getFirstName = function() {
    return _first;
  };
  this.getLastName = function() {
    return _last;
  };
  this.getFullName = function() {
    return _first + " " + _last;
  };
  this.setFirstName = function(first) {
    _first = first;
  };
  this.setLastName = function(last) {
    _last = last;
  };
  this.setFullName = function(firstAndLast) {
    _first = firstAndLast.split(" ")[0];
    _last = firstAndLast.split(" ")[1];
  };
};

var bob = new Person('Bob Ross');
console.log(bob.getFullName());
