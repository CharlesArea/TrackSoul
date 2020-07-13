"use strict";
const MongoClient = require('mongodb').MongoClient;
const {dburl, connection_options} = require('../../config/config.js');

module.exports = {
    'loginFun' : loginFun,
    'registFun': registFun,
    'getInfoFun': getInfoFun,
    'logoutFun': logoutFun
}

function checkUserExists(username) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(dburl, connection_options, function(err, client){
            if (err) {reject({message: err, status_code: 400})}
            var dbo = client.db("mydb");
            dbo.collection("user").findOne({username: username}, function(err, result) {
                if (err) {reject({message: err, status_code: 400})}
                if (result) {
                    reject({message: 'username is registed!!!!!', status_code:400})
                } else {
                    resolve()
                }
                client.close();
            });
        })
    })
}

function loginFun (username, password, res) {
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("mydb");
        dbo.collection("user").findOne({username: username}, function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            if (!result || result.password != password) {
                client.close();
                res.send({'message': 'Username or Password Invalid', 'status_code': 400})
            } else {
                client.close();
                // console.log(result)
                // TODO
                // change the username to usertoken
                res.send({'message': 'Welcome', 'status_code': 200, data: {token: result.username, avator:result.avator}});
            }
        });
    })
}

function registFun (username, password, res) {
    checkUserExists(username).then( () => {
        MongoClient.connect(dburl, connection_options, function(err, client){
            if (err) {res.send({'message': err, 'status_code': 400}); return ;}
            var dbo = client.db("mydb");
            // insert user and password
            const default_icon = 'https://www.clipartmax.com/png/middle/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png'
            var myobj = {username: username, password: password, avator: default_icon}
            dbo.collection("user").insertOne(myobj, function(err, result) {
                if (err) {res.send({'message': err, 'status_code': 400}); return ;}
                console.log(result.value)
                // client.close();
            });
            // insert a empty appList
            var appListobj = {appList: [], token: username}
            dbo.collection("appList").insertOne(appListobj, function(err, result) {
                if (err) {res.send({'message': err, 'status_code': 400}); return ;}
                console.log("next to the result")
                console.log(result.value)
                client.close();
            });
            res.send({'message': 'Welcome', 'status_code': 200, data: {token: username, avator: default_icon}});
            return ;
        })
    }).catch( reject => {
        res.send(reject)
    })
}

function getInfoFun (token, res) {
    MongoClient.connect(dburl, connection_options, function(err, client){
        if (err) {res.send({'message': err, 'status_code': 400});}
        var dbo = client.db("mydb");
        dbo.collection("appList").findOne({token: token}, function(err, result) {
            if (err) {res.send({'message': 'mongo error', 'status_code': 400})}
            res.send({'message': 'Welcome', 'status_code': 200, data: {name: token}, appList: result.appList});
            client.close();
        });
    })
}


function logoutFun (token, res) {
    res.send({'message': 'ByeBye', 'status_code': 200});
}