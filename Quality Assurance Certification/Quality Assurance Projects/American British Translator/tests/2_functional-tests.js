const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  suite('"POST" to /api/translate', () => {
    test('POST with text and locale fields populated', done => { 
      const text = "Mangoes are my favorite fruit.";
      const locale = 'american-to-british';
      const output = {
        text: "Mangoes are my favorite fruit", 
        translation: "Mangoes are my <span class='highlight'>favourite</span> fruit."
      };
      chai.request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"text": text, "locale": locale})
        .end(function(err, res){
          assert.equal(res.status, 200);
			    assert.isTrue(res.body.hasOwnProperty("text") && res.body.hasOwnProperty("translation"));
          assert.equal(res.body.translation, output.translation);
          done();
	   });
    });

    test('POST with text and invalid locale', done => {
      const text = "Mangoes are my favorite fruit.";
      const locale = 'russian-to-spanish';
      const error = { error: 'Invalid value for locale field' };
      chai.request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"text": text, "locale": locale})
        .end(function(err, res){
          assert.equal(res.status, 200);
			    assert.isTrue(res.body.hasOwnProperty("error"));
          assert.equal(res.body.error, error.error);
          done();
	   });
    });

    test('POST with missing text field', done => {
      const locale = "american-to-british";
      const error = { error: 'Required field(s) missing' }
      chai.request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"text": text, "locale": locale})
        .end(function(err, res){
          assert.equal(res.status, 200);
			    assert.isTrue(res.body.hasOwnProperty("error"));
          assert.equal(res.body.error, error.error);
          done();
	   });
    });
    
    test('POST with missing locale field', done => {
      const text = "freeCodeCamp rocks!";
      const error = { error: 'Required field(s) missing' }
		  chai.request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({"text": text})
        .end(function(err, res){
          assert.equal(res.status, 200);
			    assert.isTrue(res.body.hasOwnProperty("error"));
          assert.equal(res.body.error, error.error);
          done();
	   });
    });
    
    test('POST with missing text', done => {
      const text = "";
      const locale = "american-to-british";
      const error = { error: 'No text to translate' }
      chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({"locale": locale})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isTrue(res.body.hasOwnProperty("error"));
            assert.equal(res.body.error, error.error);
            done();
          });
    });

    test('POST with text that needs no translation', done => {
      const text = "SaintPeter and nhcarrigan say hello!";
      const locale = "british-to-american"
      const output = {
        text: "SaintPeter and nhcarrigan say hello!", 
        translation: "Everything looks good to me!"
      }
      chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({"text": text, "locale": locale})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isTrue(res.body.hasOwnProperty("text") && res.body.hasOwnProperty("translation"));
            assert.equal(res.body.translation, output.translation);
            done();
          });
      });
  });  
});
