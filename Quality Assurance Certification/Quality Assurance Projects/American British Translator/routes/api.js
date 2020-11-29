'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      
      if(!getErrors(req.body)) {
        let result = {
          "text": req.body.text,
          "translation": translator.translate(req.body.text, req.body.locale == "american-to-british" ? true : false, true)
        }
        if (result.text == result.translation) {
          result.translation = "Everything looks good to me!"
        }
        res.json(result);
      } else {
        res.json(getErrors(req.body));
      }
    });
};

// Return true if the body is valid.
// Return a JSON object with the error otherwise.
function getErrors(body) {

  if (!body.hasOwnProperty("text") || !body.hasOwnProperty("locale")) { 
    return {"error": "Required field(s) missing"};
  } else if (!["american-to-british", "british-to-american"].includes(body.locale)) {
    return {"error": "Invalid value for locale field"};
  } else if (body.text.trim().length === 0) {
    return {"error": "No text to translate"};
  } else {
    return false;
  }
}