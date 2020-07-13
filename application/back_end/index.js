const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const router = require('./router');

const app = new express()
app.use(bodyParser.json({limit:'100mb'}))
app.use(bodyParser.urlencoded({limit:'100mb',extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router);

const port = 3000
app.listen(port, ()=>{
    console.log("listening on port " + port)
});