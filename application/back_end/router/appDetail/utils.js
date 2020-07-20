"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/config.js');

module.exports = {
    'updateFun' : updateFun,
    'userCountFun': userCountFun,
    'getTrackRequest': getTrackRequest,
    'getClickEventFiltDate': getClickEventFiltDate
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

function userCountFun (token, res) {
    console.log(token)
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("trackingClickEvent");
        var collection_name = "clickEvent_" + token
        console.log(collection_name)
        dbo.collection(collection_name).find({}, {projection:{_id:0, result: 1}}).toArray(function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            client.close();
            res.send({'message': 'Success', 'status_code': 200, data: result});
        });
    })
}

function getTrackRequest (token, res) {
    console.log(token)
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("trackingReqEvent");
        var collection_name = "reqEvent_" + token
        console.log(collection_name)
        dbo.collection(collection_name).find({}, {projection:{_id:0, result: 1}}).toArray(function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            client.close();
            res.send({'message': 'Success', 'status_code': 200, data: result});
        });
    })
}

function getClickEventFiltDate (token, startDate, endDate, res) {
    console.log(token)
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("trackingClickEvent");
        var collection_name = "clickEvent_" + token
        console.log(collection_name)
        dbo.collection(collection_name).find({ "result.click_time": {$gte: startDate, $lt: endDate} }, {projection:{_id:0, result: 1}}).toArray(function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            client.close();
            res.send({'message': 'Success', 'status_code': 200, data: result});
        }); 
    })
}