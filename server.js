var express = require('express');
var execute = require('./controller');

var app = express();
// app.use(app.router);
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

