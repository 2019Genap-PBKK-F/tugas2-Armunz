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


// CRUD Kategori UNIT

// Tampilkan data kategori unit
app.get('/api/kategori-unit', function(request, response){
   var query = "SELECT * FROM KategoriUnit";
   execute.execQuery(query, response, null);
});

// Insert Kategori Unit data
app.post('/api/kategori-unit', function(request, response){
   console.log("Query: Insert Kategori Unit Data");
   var query = "INSERT INTO KategoriUnit(id, nama) VALUES('', '')";
   execute.execQuery(query, response, null);
});

// Update Kategori Unit data
app.put('/api/kategori-unit/:id', function(request, response){
   console.log("Query: Update Kategori Unit Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value:request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value:request.body.nama}
   ];

   var query = "UPDATE KategoriUnit SET nama = @nama WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Kategori Unit Data
app.delete('/api/kategori-unit/:id', function(request, response){
   console.log("Query: Delete Kategori Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM KategoriUnit WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Unit
// Tampilkan data Unit
app.get('/api/unit', function(request, response){
   var query = "SELECT * FROM Unit";
   execute.execQuery(query, response, null);
});

// Insert Unit data
app.post('/api/unit', function(request, response){
   console.log("Query: Insert Unit Data");
   var query = "INSERT INTO Unit(id, KategoriUnit_id, nama) VALUES('', '', '')";
   execute.execQuery(query, response, null);
});

// Update Unit data
app.put('/api/unit/:id', function(request, response){
   console.log("Query: Update Unit Data");
   
   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'KategoriUnit_id', sqlType: sql.Int, value: request.body.KategoriUnit_id},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama}
   ];

   var query = "UPDATE Unit SET KategoriUnit_id = @KategoriUnit_id, nama = @nama WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Unit Data
app.delete('/api/unit/:id', function(request, response){
   console.log("Query: Delete Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM Unit WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Data Dasar
// Tampilkan data data dasar
app.get('/api/data-dasar', function(request, response){
   var query = "SELECT * FROM DataDasar";
   execute.execQuery(query, response, null);
});

// Insert Data Dasar data
app.post('/api/data-dasar', function(request, response){
   console.log("Query: Insert Data Dasar Data");
   var query = "INSERT INTO DataDasar(id, nama) VALUES('', '')";
   execute.execQuery(query, response, null);
});

// Update Data Dasar data
app.put('/api/data-dasar/:id', function(request, response){
   console.log("Query: Update Data Dasar Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama}
   ];

   var query = "UPDATE DataDasar SET nama = @nama WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Data Dasar Data
app.delete('/api/data-dasar/:id', function(request, response){
   console.log("Query: Delete Data Dasar Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM DataDasar WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Capaian Unit
// Tampilkan data capaian unit
app.get('/api/capaian-unit', function(request, response){
   var query = "SELECT * FROM Capaian_Unit";
   execute.execQuery(query, response, null);
});

// Insert Capaian Unit data
app.post('/api/capaian-unit', function(request, response){
   console.log("Query: Insert Capaian_Unit Data");
   var query = "INSERT INTO Capaian_Unit(id, DataDasar_id, Unit_id, waktu, capaian) VALUES('', '', '', '', '')";
   execute.execQuery(query, response, null);
});

//Update Capaian_Unit data
app.put('/api/capaian-unit', function(request, response){
   console.log("Query: Update Capaian_Unit Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'DataDasar_id', sqlType: sql.Int, value: request.body.DataDasar_id},
      {name: 'Unit_id', sqlType: sql.Int, value: request.body.Unit_id},
      {name: 'waktu', sqlType: sql.DateTime, value: request.body.waktu},
      {name: 'capaian', sqlType: sql.Float, value: request.body.capaian}
   ];

   var query = "UPDATE Capaian_Unit SET DataDasar_id = @DataDasar_id, Unit_id = @Unit_id, waktu = @waktu, capaian = @capaian WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Capaian_Unit Data
app.delete('/api/capaian-unit/:id', function(request, response){
   console.log("Query: Delete Capaian_Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM Capaian_Unit WHERE id = @id";
   execute.execQuery(query, response, param);
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

