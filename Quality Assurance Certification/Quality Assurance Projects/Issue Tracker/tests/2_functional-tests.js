const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('POST /api/issues/{project}', function() {
    
    test('Every field filled in', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        const sent = {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        }

        for (const key in sent) {
          if (sent.hasOwnProperty(key) && res.body.hasOwnProperty(key)) {
            assert.equal(sent[key], res.body[key]);
          }
        }

        assert.isTrue(res.body.hasOwnProperty("_id"));
        assert.isTrue(res.body.hasOwnProperty("created_on"));
        assert.isTrue(res.body.hasOwnProperty("updated_on"));
        assert.isTrue(res.body.open);
        
        done();
      });
    });
    
    test('Required fields filled in, Optional Fields Blank', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        const sent = {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: '',
          status_text: ''
        }

        for (const key in sent) {
          if (sent.hasOwnProperty(key) && res.body.hasOwnProperty(key)) {
            assert.equal(sent[key], res.body[key]);
          }
        }

        assert.isTrue(res.body.hasOwnProperty("_id"));
        assert.isTrue(res.body.hasOwnProperty("created_on"));
        assert.isTrue(res.body.hasOwnProperty("updated_on"));
        assert.isTrue(res.body.open);
        
        done();
      });
    });
    
    test('Missing required fields => { error: "required field(s) missing" }', function(done) {
      chai.request(server)
      .post('/api/issues/test')
      .send({
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, "error");

        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
    });
    
  });

  suite('GET /api/issues/{project}', function() {
    
    test('No filter', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.property(res.body[0], '_id');
        done();
      });
    });
    
    test('One filter', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({_id: '5fb6e0c632a91870f0fa9dde'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
        }
        done();
      });
    });
    
    test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .query({_id: '5fbecb782025bd03239f4d83', open: true, created_by: "Daniel"})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
        }
        done();
      });
    });
    
  });
  
  suite('PUT /api/issues/{project}', function() {
          
    test('One field to update => {result: "successfully updated", _id: _id}', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({
        _id: '5fc4113e47c6e500b2053172',
        issue_text: 'newText'
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'open');
        assert.property(res.body, 'status_text');
        assert.property(res.body, '_id');

        assert.equal(res.body.issue_text, "newText");
      });
      chai.request(server)
      .get('/api/issues/test')
      .query({_id: '5fc4113e47c6e500b2053172'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assert.property(res.body[0].issue_text, "newText");
        }
        done();
      });
    });
    
    test('Multiple fields to update => {result: "successfully updated", _id: _id}', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({
        _id: '5fc4113e47c6e500b2053172',
        issue_text: 'NewNewTextFromPut',
        open: false
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, 'issue_title');
        assert.property(res.body, 'issue_text');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'created_by');
        assert.property(res.body, 'assigned_to');
        assert.property(res.body, 'open');
        assert.property(res.body, 'status_text');
        assert.property(res.body, '_id');

        assert.equal(res.body.issue_text, "newText");
      });
      chai.request(server)
      .get('/api/issues/test')
      .query({_id: '5fc4113e47c6e500b2053172'})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assert.property(res.body[0].issue_text, "NewNewTextFromPut");
          assert.property(res.body[0].open, false);
        }
        done();
      });
    });

    test('No _id submitted => { error: "missing _id" }', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({
        issue_text: 'NewNewTextFromPut',
        open: false
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, "error");

        assert.equal(res.body.error, "missing _id");
        done();
      });
    });

    test('No fields to update => { error: "no update field(s) sent", _id: _id }', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({
        _id: "5fc4113e47c6e500b2053172"
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, "error");
        assert.property(res.body, "_id");

        assert.equal(res.body.error, "no update field(s) sent");
        assert.equal(res.body._id, "5fc4113e47c6e500b2053172");
        done();
      });
    });

    test('Invalid _id => { error: "missing _id" }', function(done) {
      chai.request(server)
      .put('/api/issues/test')
      .send({
        _id: "5f665eb46e296f6b9b6a504d"
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        
        assert.property(res.body, "error");

        assert.equal(res.body.error, "missing _id");
        done();
      });
    });
    
  });
   
  
  suite('DELETE /api/issues/{project}', function() {

    test('Valid _id', function(done) {
      let validID = null;
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
  
          assert.isTrue(res.body.hasOwnProperty("_id"));

          validID = res.body._id;
      });

      chai.request(server)
      .delete('/api/issues/test')
      .send({
        _id: validID
      })
      .end(function(err, res){
        assert.equal(res.status, 200);

        //{"result":"successfully deleted","_id":"5fc41c3947c6e500b205317e"}
        assert.property(res.body, "result");
        assert.property(res.body, "_id");

        assert.equal(res.body.result, "successfully deleted");
        assert.equal(res.body._id, validID);
        done();
      });
    });

    test('Invalid _id => { error: "could not delete", "_id": _id }', function(done) {
      const badId = "5f665eb46e296f6b9b6a504d";
      chai.request(server)
      .delete('/api/issues/test')
      .send({
        _id: badId
      })
      .end(function(err, res){
        assert.equal(res.status, 200);

        //{"error":"could not delete","_id":"5fc41c396e500b205317e"}
        assert.property(res.body, "error");
        assert.property(res.body, "_id");

        assert.equal(res.body.result, "could not delete");
        assert.equal(res.body._id, badId);
        done();
      });
    });
    
    test('No _id => { error: "missing _id" }', function(done) {
      chai.request(server)
      .delete('/api/issues/test')
      .send({
        noID: "123"
      })
      .end(function(err, res){
        assert.equal(res.status, 200);

        //{ error: "missing _id" }
        assert.property(res.body, "error");

        assert.equal(res.body.result, "missing _id");
        done();
      });
    });
  });
});
