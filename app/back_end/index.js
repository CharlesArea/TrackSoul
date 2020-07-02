/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-04-28 13:25
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-04-30 14:43
 */



const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const router = require('./router');
const https = require('https')
const fs = require('fs')

const app = new express()
app.use(bodyParser.json({limit:'100mb'}))
app.use(bodyParser.urlencoded({limit:'100mb',extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router);

const port = 3000
app.listen(port, ()=>{
    console.log("listening on port " + port)
});
// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
//   }, app)
//   .listen(port, function () {
//     console.log('Example app listening on port 3000! Go to https://localhost:8080/')
//   })
