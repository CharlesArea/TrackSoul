"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/trackingConfig.js');

module.exports = {
    'clickPostFun' : clickPostFun,
    'reqPostFun' : reqPostFun
}

function reqPostFun (reqEventObj, res) {
    if ('result' in reqEventObj){
        MongoClient.connect(dburl, connection_options, function(err, client){
            if (err) {res.send({'message': err, 'status_code': 400}); return ;}
            var dbo = client.db("trackingReqEvent");
            var collection_name = "reqEvent_" + reqEventObj.client_id
            dbo.collection(collection_name).insertOne(reqEventObj, function(err, result) {
                if (err) {res.send({'message': err, 'status_code': 400}); return ;}
                client.close();
                res.send({'message': 'Success', 'status_code': 200});
            });
            return ;
        })
    } else {
        res.send({'message': 'got nothing', 'status_code': 500})
    }
}



function clickPostFun (clickEventObj, res) {
    if ('result' in clickEventObj){
        MongoClient.connect(dburl, connection_options, function(err, client){
            if (err) {res.send({'message': err, 'status_code': 400}); return ;}
            var dbo = client.db("trackingClickEvent");
            var collection_name = "clickEvent_" + clickEventObj.client_id
            dbo.collection(collection_name).insertOne(clickEventObj, function(err, result) {
                if (err) {res.send({'message': err, 'status_code': 400}); return ;}
                client.close();
                res.send({'message': 'Success', 'status_code': 200});
            });
            return ;
        })
    } else {
        res.send({'message': 'got nothing', 'status_code': 500})
    }
}
