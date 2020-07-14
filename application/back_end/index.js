const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const router = require('./router');
const trackingPost = require("./router/trackingPost/index");

const app = new express()
app.use(bodyParser.json({limit:'100mb'}))
app.use(bodyParser.urlencoded({limit:'100mb',extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
 
// app.post('/trackingPost/general', (req, res) => {
//     console.log(req.body)
// })
app.use('/', router);

const port = 5000
app.listen(port, ()=>{
    console.log("listening on port " + port)
});