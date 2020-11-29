const americanOnly = require('./american-only.js'); // Keys are American, values are British!
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");

const britishOnly = require('./british-only.js'); // Keys are British, values are American!
const britishToAmericanSpelling = swapKeyValue(americanToBritishSpelling);
const britishToAmericanTitles = swapKeyValue(americanToBritishTitles);

function swapKeyValue(dict){
   let inverted = {};
   for(const key in dict){
      inverted[dict[key]] = key;
   }
   return inverted;
}

// Cheeky function to make this a lot simpler at the expense of some memory.
function completeDictionary(dict) {
   let complete = {};
   for(const key in dict){
      complete[key.toLowerCase()] = dict[key].toLowerCase();
      complete[key.toUpperCase()] = dict[key].toUpperCase();
      complete[key[0].toUpperCase() + key.slice(1)] = dict[key][0].toUpperCase() + dict[key].slice(1);
   }
   return complete;
}

class Translator {
   constructor() {
      this.completeAmericanToBritish = completeDictionary(Object.assign({}, americanOnly, americanToBritishSpelling, americanToBritishTitles));
      this.completeBritishToAmerican = completeDictionary(Object.assign({}, britishOnly, britishToAmericanSpelling, britishToAmericanTitles));
   }

   translate(text, toBritish, highlight) {
      let resultText = text;

      resultText = this.translateTimes(resultText, toBritish, highlight);
      resultText = this.translateWords(resultText, toBritish, highlight);

      return resultText;
   }

   // British -> 10.30
   // American -> 10:30
   translateTimes(text, toBritish, highlight) {
      if (toBritish) {
         return text.replace(/([0-9]+)(\:)([0-9]+)/g, highlight ? this.getHighlighted("$1.$3") : "$1.$3");
      } else {
         return text.replace(/([0-9]+)(\.)([0-9]+)/g, highlight ? this.getHighlighted("$1:$3") : "$1:$3");
      }
   }

   translateWords(text, toBritish, highlight) {
      const currentDictionary = toBritish ? this.completeAmericanToBritish : this.completeBritishToAmerican;
      let returnText = text;

      for(const word of Object.keys(currentDictionary)) {
         if (returnText.includes(word)) {
            // replaceAll() is only supported since August 2020 so not every browser accepts it at the moment. Repl.it doesn't support it either.
            // returnText = returnText.replaceAll(word, highlight ? this.getHighlighted(currentDictionary[word]) : currentDictionary[word]);
            // Here is another option (slower, but simple, if performance is not essential):
            returnText = returnText.split(word).join(highlight ? this.getHighlighted(currentDictionary[word]) : currentDictionary[word]);
         }
      }

      return returnText;
   }

   hasProperty(dict, word) {
      console.log(word);
      return dict.hasOwnProperty(word);
   }

   getHighlighted(text) {
      return '<span class="highlight">' + text + '</span>';
   }
}

module.exports = Translator;