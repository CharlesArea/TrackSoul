/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-24 17:53
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-24 18:46
 */

 var express = require("express");
 var app = express();
 const bodyParser = require('body-parser');
 var MongoClient = require('mongodb').MongoClient
 var db;

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 app.all('*', function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });


 // MongoClient.connect('mongodb+srv://beathimup:Wg7gr2od13@cluster0-lg2mt.azure.mongodb.net/web_data?retryWrites=true&w=majority', function (err, database) {
 //    if (err)
 //    	throw err
 //    else
 //    {
 // 	db = database;
 // 	console.log('Connected to MongoDB');
 // 	//Start app only after connection is ready
 // 	app.listen(3000);
 //    }
 //  });


 app.post('/users_data', (req, res) => {
     var website_data = req.body;
     MongoClient.connect('mongodb+srv://beathimup:Wg7gr2od13@cluster0-lg2mt.azure.mongodb.net/web_data?retryWrites=true&w=majority', function (err, client) {
        if (err) throw err;
        var db = client.db('web_data');
        db.collection('web_data').insert(website_data, function (findErr, result) {
          if (findErr) throw findErr;
          client.close();
        });
          });

  });

//
 app.listen(3000, () => {
  console.log("Server running on port 3000");
 });
