"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/config.js');
const axios = require('axios')
const opn = require('opn');

module.exports = {
    'visit_website': visit_website,
    'updateFun' : updateFun,
    'userCountFun': userCountFun,
    'getTrackRequest': getTrackRequest,
    'getClickEventFiltDate': getClickEventFiltDate
}

async function visit_website(url, token, res) {
    var option = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
    }
    // axios.get(url).then(data => {
    // cannot simulate as browser visit website
    opn(url)
    // axios({
    //     method: 'get',
    //     url: url,
    //     headers: option
    // }).then(data => {
    //     // console.log(data)
    //     MongoClient.connect(dburl, connection_options, function(err, client){
    //         if (err) {res.send({'message': err, 'status_code': 400});}
    //         var dbo = client.db("trackingReqEvent");
    //         var collection_name = "reqEvent_" + token
    //         console.log(collection_name)
    //         dbo.collection(collection_name).find({}, {projection:{_id:0, result: 1}}).toArray(function(err, result) {
    //             if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
    //             console.log(result.length)
    //             if (result.length) {
    //                 res.send({'message': 'Success', 'status_code': 200});
    //             } else {
    //                 res.send({'message': 'Cannot find any record', 'status_code': 400});
    //             }
    //             client.close();

    //         });
    //     })
    // }).catch(err => {
    //     console.log(res.send({'message': 'Visit Error', 'status_code': 400}))
    // })

    setTimeout(() => {
        MongoClient.connect(dburl, connection_options, function(err, client){
            if (err) {res.send({'message': err, 'status_code': 400});}
            var dbo = client.db("trackingReqEvent");
            var collection_name = "reqEvent_" + token
            console.log(collection_name)
            dbo.collection(collection_name).find({}, {projection:{_id:0, result: 1}}).toArray(function(err, result) {
                if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
                console.log(result.length)
                client.close();
                if (result.length) {
                    res.send({'message': 'Success', 'status_code': 200});
                    return ;
                } else {
                    res.send({'message': 'Cannot find any record', 'status_code': 400});
                    return ;
                }

            });
        })
    }, 5000)
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