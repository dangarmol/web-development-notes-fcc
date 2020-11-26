'use strict';

module.exports = function (app) {

  const mongoose = require('mongoose')
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const Schema = mongoose.Schema;

  const issueSchema = new Schema({
    //_id: "5871dda29faedc3491ff93bb"
    project: {type: String, required: true},
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_on: Date,
    updated_on: Date,
    created_by: {type: String, required: true},
    assigned_to: String,
    open: Boolean,
    status_text: String
  }, { versionKey: false });

  let Issue = mongoose.model("Issue", issueSchema, "issue-tracker");

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      // PARAMS: project
      // QUERY: _id, issue_title, issue_text, created_on, updated_on, created_by, assigned_to, open, status_text
      /* RESPONSE: [
                    {
                      "assigned_to": "",
                      "status_text": "",
                      "open": true,
                      "_id": "5fb6e0c632a91870f0fa9dde",
                      "issue_title": "Live Test",
                      "issue_text": "Someone",
                      "created_by": "David",
                      "created_on": "2020-11-19T21:16:54.132Z",
                      "updated_on": "2020-11-19T21:16:54.132Z"
                    } // RETURN ALL ELEMENTS MATCHING
                  ]*/

      console.log("GET from " + req.params.project);
      console.log(req.query);
      //res.json({"request": "GET from " + project,
      //          "params": req.query});
      const query = req.query;
      query.project = req.params.project;

      Issue.find(query).select("_id issue_title issue_text created_on updated_on created_by assigned_to open status_text").exec(function (err, data) {
        if (err) return console.log(err);
        // The "project" attribute has been filtered in the SELECT!
        res.json(data);
      });
    })
    
    .post(async (req, res) => {
      // PARAMS: project
      // BODY: issue_title*, issue_text*, created_by*, assigned_to, status_text

      console.log("POST on " + req.params.project);

      if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.json({ error: "required field(s) missing" });
        return;
      }

      let newIssueJSON = {
        "project": req.params.project,
        "issue_title": req.body.issue_title,
        "issue_text": req.body.issue_text,
        "created_by": req.body.created_by,
        "assigned_to": req.body.assigned_to ? req.body.assigned_to : "",
        "status_text": req.body.status_text ? req.body.status_text : "",
        "created_on": new Date().toISOString(),
        "updated_on": new Date().toISOString(),
        "open": true
      };

      const newIssue = new Issue(newIssueJSON);
  
      await newIssue.save({new:true}, function(err, data) {
        if (err) return console.error(err);
        let responseJSON = JSON.parse(JSON.stringify(data)); // Simple way of copying the object to allow editing.
        delete responseJSON["project"];
        console.log("Inside save promise! This is the response:");
        console.log(responseJSON);
        res.json(responseJSON);
      });
      
    })
    
    .put(async (req, res) => {
      // PARAMS: project
      // BODY: _id*, issue_title, issue_text, created_by, assigned_to, status_text, open

      console.log("PUT on " + req.params.project);

      const check = await Issue.findOne({ "_id": req.body._id });

      if(!check) {
        res.json({error: "missing _id"});
        return;
      }

      let updatedObject = {
        "issue_title": req.body.issue_title,
        "issue_text": req.body.issue_text,
        "created_by": req.body.created_by,
        "assigned_to": req.body.assigned_to,
        "status_text": req.body.status_text,
        "open": !req.body.open, // The checkbox marks whether an issue is closed, not open!
        "updated_on": new Date().toISOString()
      }

      if(!updatedObject.issue_title && !updatedObject.issue_text && !updatedObject.created_by && !updatedObject.assigned_to &&
         !updatedObject.status_text && check.open == updatedObject.open) {
        res.json({ error: "no update field(s) sent", "_id": req.body._id });
        return;
      }
    
      for(const property in updatedObject) {
        if(updatedObject[property] == "") {
          delete updatedObject[property];
        }
      }

      try {
        // No need to query by project, as IDs are unique.
        Issue.findOneAndUpdate({ "_id": req.body._id }, updatedObject, {new: true}, function (err, data) {
          if (err) {
            console.error("Error during MongoDB Update!");
            console.error(err);
            res.json({ "error": "could not update ", "_id": + req.body._id });
            return;
          }
          let result = {"result": "successfully updated"};
          result["_id"] = data._id;
          
          res.json(result);
        });
      } catch (error) {
        console.log("Try-Catch Error!")
        console.log(error)
        res.json({ "error": "could not update ", "_id": + req.body._id });
      }
    })
    
    .delete(function (req, res){
      // PARAMS: project
      // BODY: _id*
      console.log("DELETE from " + req.params.project);
      res.json({"request": "DELETE from " + project,
                "id": req.body._id});
    });
    
};
