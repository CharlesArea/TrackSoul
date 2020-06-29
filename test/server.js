/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-27 12:45
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-29 11:39
 */

 var path = require('path');
 var express = require('express');
 var app = express();

 var dir = path.join(__dirname);
// console.log(dir+'/src/');
 app.use(express.static(dir));

console.log(dir);
 app.get('/',function(req,res) {
   res.sendFile('index.html');
 });

 app.listen(3000, () => console.log('Listening on http://localhost:3000/'));
