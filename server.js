var http = require("http");
var express = require('express');
var execute = require('./controller');

var app = express();
// app.use(app.router);
var dbServer = '10.199.14.46';
var port = '8006';

app.get('/', function(request, response){
   response.send("Halo-halo");
});

app.get('/api/mahasiswa', function(request, response){
   var query = "select * from mahasiswa";
   execute.execQuery(query, response);
});

app.listen(port, function(){
   console.log("Server running at http://10.199.14.46:8006/");
});
// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8006);

// Console will print the message
// console.log('Server running at http://127.0.0.1:8006/');

