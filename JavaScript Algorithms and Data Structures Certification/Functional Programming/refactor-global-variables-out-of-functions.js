// The global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
function add (bookArray, bookName) {
  let result = [...bookArray];
  result.push(bookName);
  return result;
  
  // Change code above this line
}

// Change code below this line
function remove (bookArray, bookName) {
  let result = [...bookArray];
  var book_index = result.indexOf(bookName);
  if (book_index >= 0) {

    result.splice(book_index, 1);
    return result;

    // Change code above this line
    }
}

var newBookList = add(bookList, 'A Brief History of Time');
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');

console.log(bookList);
