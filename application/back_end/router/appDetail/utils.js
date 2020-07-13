"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/config.js');

module.exports = {
    'updateFun' : updateFun,
}

function updateFun (appList, token, res) {
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("mydb");
        dbo.collection('appList').findOneAndUpdate({ "token" : token }, { $set: { "appList" : appList} }, function(error, result){
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            client.close();
            res.send({'message': 'Welcome', 'status_code': 200, data: {token: result.username, avator:result.avator}});
        });
    })
}