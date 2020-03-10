var express = require('express');
var execute = require('./controller');
var bodyParser = require('body-parser');
var sql = require('mssql');

var port = '8006';
var cors = require("cors");
var app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/', function(request, response){
   response.send("Halo-halo");
});

//Tampilkan semua data
app.get('/api/mahasiswa', function(request, response){
   var query = "SELECT * FROM jexcel";
   execute.execQuery(query, response, null);
});

//Insert data
app.post('/api/mahasiswa', function(request, response){
   console.log("Query: Insert Data");
   var query = "INSERT INTO jexcel(nrp, nama, angkatan, jenis_kelamin, tanggal_lahir, foto, aktif) VALUES('', '', '', '', '', '', '')";
   execute.execQuery(query, response, null);
});

// Update data
app.put('/api/mahasiswa/:id', function(request, response){
   console.log("Query: Update Data");
   // Parameter
   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'nrp', sqlType: sql.VarChar, value: request.body.nrp},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'angkatan', sqlType: sql.Int, value: request.body.angkatan},
      {name: 'jenis_kelamin', sqlType: sql.VarChar, value: request.body.jenis_kelamin},
      {name: 'tanggal_lahir', sqlType: sql.Char, value: request.body.tanggal_lahir},
      {name: 'foto', sqlType: sql.VarChar, value: request.body.foto},
      {name: 'aktif', sqlType: sql.Bit, value: request.body.aktif}
   ];
   var query = "UPDATE jexcel SET nrp = @nrp, nama = @nama, angkatan = @angkatan, jenis_kelamin = @jenis_kelamin, tanggal_lahir = @tanggal_lahir, foto = @foto, aktif = @aktif WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Data
app.delete('/api/mahasiswa/:id', function(request, response){
   console.log("Query: Delete Data");
   // Parameter
   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [jexcel] WHERE id=@id";
   execute.execQuery(query, response, param);

});

app.listen(port, function(){
   console.log("Server running at http://10.199.14.46:8006/");
});

