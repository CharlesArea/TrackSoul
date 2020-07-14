"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/config.js');

module.exports = {
    'updateFun' : updateFun,
}

function updateFun (appObj, res) {

    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("mydb");
        dbo.collection("appList").insertOne(appObj, function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            client.close();
            res.send({'message': 'Success', 'status_code': 200});
        });
    })
}