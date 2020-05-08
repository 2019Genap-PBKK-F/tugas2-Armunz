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
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
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
   var query = "SELECT * FROM [KategoriUnit]";
   execute.execQuery(query, response, null);
});

// Insert Kategori Unit data
app.post('/api/kategori-unit', function(request, response){
   console.log("Query: Insert Kategori Unit Data");
   var query = "INSERT INTO [KategoriUnit](nama) VALUES('')";
   execute.execQuery(query, response, null);
});

// Update Kategori Unit data
app.put('/api/kategori-unit/:id', function(request, response){
   console.log("Query: Update Kategori Unit Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value:request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value:request.body.nama}
   ];

   var query = "UPDATE [KategoriUnit] SET nama = @nama WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Kategori Unit Data
app.delete('/api/kategori-unit/:id', function(request, response){
   console.log("Query: Delete Kategori Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [KategoriUnit] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Unit
// Tampilkan data Unit
app.get('/api/unit', function(request, response){
   var query = "SELECT * FROM [Unit]";
   execute.execQuery(query, response, null);
});

// Get KategoriUnit_id
app.get('/api/kategori-unit-list', function(request, response){
   var query = "SELECT id, nama as name FROM [KategoriUnit]";
   execute.execQuery(query, response, null);
});

// Insert Unit data
app.post('/api/unit', function(request, response){
   console.log("Query: Insert Unit Data");
   var query = "INSERT INTO [Unit](KategoriUnit_id, nama) VALUES('', '')";
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

   var query = "UPDATE [Unit] SET KategoriUnit_id = @KategoriUnit_id, nama = @nama WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Unit Data
app.delete('/api/unit/:id', function(request, response){
   console.log("Query: Delete Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Unit] WHERE id = @id";
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
   var query = "INSERT INTO [DataDasar](nama, create_date, last_update, expired_date) VALUES('', CONVERT(varchar, GETDATE(), 20), CONVERT(varchar, GETDATE(), 20), '')";
   execute.execQuery(query, response, null);
});

// Update Data Dasar data
app.put('/api/data-dasar/:id', function(request, response){
   console.log("Query: Update Data Dasar Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'create_date', sqlType: sql.VarChar, value: request.body.create_date},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update},
      {name: 'expired_date', sqlType: sql.VarChar, value: request.body.expired_date}

   ];

   var query = "UPDATE [DataDasar] SET nama = @nama, create_date = @create_date, last_update = CONVERT(varchar, GETDATE(), 20), expired_date = @expired_date WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Data Dasar Data
app.delete('/api/data-dasar/:id', function(request, response){
   console.log("Query: Delete Data Dasar Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [DataDasar] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Capaian Unit
// Tampilkan data capaian unit
app.get('/api/capaian-unit', function(request, response){
   var query = "SELECT * FROM [Capaian_Unit]";
   execute.execQuery(query, response, null);
});

// Get data dasar list
app.get('/api/data-dasar-list', function(request, response){
   var query = "SELECT id, nama as name FROM [DataDasar]";
   execute.execQuery(query, response, null);
});

// Get unit list
app.get('/api/satuan-kerja-list', function(request, response){
   var query = "SELECT id, nama as name FROM [SatuanKerja]";
   execute.execQuery(query, response, null);
});

// Insert Capaian Unit data
app.post('/api/capaian-unit', function(request, response){
   console.log("Query: Insert Capaian_Unit Data");
   var query = "INSERT INTO [Capaian_Unit](id_satker, id_datadasar, waktu, capaian) VALUES('', '', '', '')";
   execute.execQuery(query, response, null);
});

//Update Capaian_Unit data
app.put('/api/capaian-unit/:id', function(request, response){
   console.log("Query: Update Capaian_Unit Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'id_satker', sqlType: sql.Int, value: request.body.id_satker},
      {name: 'id_datadasar', sqlType: sql.Int, value: request.body.id_datadasar},
      {name: 'waktu', sqlType: sql.VarChar, value: request.body.waktu},
      {name: 'capaian', sqlType: sql.Float, value: request.body.capaian}
   ];

   var query = "UPDATE [Capaian_Unit] SET id_satker = @id_satker, id_datadasar = @id_datadasar, waktu = @waktu, capaian = @capaian WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Capaian_Unit Data
app.delete('/api/capaian-unit/:id', function(request, response){
   console.log("Query: Delete Capaian_Unit Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Capaian_Unit] WHERE id = @id";
   execute.execQuery(query, response, param);
});

// CRUD Indikator Periode
// Tampilkan Indikator Periode
app.get('/api/indikator-periode', function(request, response){
   var query = "SELECT * FROM [Indikator_Periode]";
   execute.execQuery(query, response, null);
});

// Get Master Indikator List
app.get('/api/master-indikator-list', function(request, response){
   var query = "SELECT id, nama as name FROM [MasterIndikator]";
   execute.execQuery(query, response, null);
});

// Get Periode List
app.get('/api/periode-list', function(request, response){
   var query = "SELECT id, nama as name FROM [Periode]";
   execute.execQuery(query, response, null);
});

// Insert Indikator Periode
app.post('/api/indikator-periode', function(request, response){
   console.log("Query: Insert Indikator_Periode Data");
   var query = "INSERT INTO [Indikator_Periode](id_master, id_periode, bobot) VALUES('', '', '')";
   execute.execQuery(query, response, null);
});

//Update Indikator Periode data
app.put('/api/indikator-periode/:id', function(request, response){
   console.log("Query: Update Indikator_Periode Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'id_master', sqlType: sql.Int, value: request.body.id_master},
      {name: 'id_periode', sqlType: sql.Int, value: request.body.id_periode},
      {name: 'bobot', sqlType: sql.Float, value: request.body.bobot}
   ];

   var query = "UPDATE [Indikator_Periode] SET id_master = @id_master, id_periode = @id_periode, bobot = @bobot WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Indikator Periode
app.delete('/api/indikator-periode/:id', function(request, response){
   console.log("Query: Delete Indikator_Periode Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Indikator_Periode] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD  Indikator Satuan Kerja
// Get Indikator Satuan Kerja
app.get('/api/indikator-satuan-kerja', function(request, response){
   var query = "SELECT * FROM [Indikator_SatuanKerja]";
   execute.execQuery(query, response, null);
});

// Get Satuan Kerja List
app.get('/api/satuan-kerja-list', function(request, response){
   var query = "SELECT id, nama as name FROM [SatuanKerja]";
   execute.execQuery(query, response, null);
});

// // Trigger Indikator Satuan Kerja Log
// function trigger_log(response, param){
//    console.log("Query: Insert Indikator_SatuanKerja_Log Data");
//    // console.log(param);
//    var query = "INSERT INTO [Indikator_SatuanKerja_Log](id_periode, id_master, id_satker, capaian, create_date) VALUES('', '', '', '', CONVERT(varchar, GETDATE(), 20))";
//    execute.execQuery(query, response, param);
// };

// Insert Indikator Satuan Kerja
app.post('/api/indikator-satuan-kerja', function(request, response){
   console.log("Query: Insert Indikator_SatuanKerja Data");
   var query = "INSERT INTO [Indikator_SatuanKerja](id_periode, id_master, id_satker, bobot, target, capaian, last_update) VALUES('', '', '', '', '', '', CONVERT(varchar, GETDATE(), 20))";
   execute.execQuery(query, response, null);
});

//Update Indikator Satuan Kerja data
app.put('/api/indikator-satuan-kerja/:id', function(request, response){
   console.log("Query: Update Indikator_SatuanKerja Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'id_periode', sqlType: sql.Int, value: request.body.id_periode},
      {name: 'id_master', sqlType: sql.Int, value: request.body.id_master},
      {name: 'id_satker', sqlType: sql.Int, value: request.body.id_satker},
      {name: 'bobot', sqlType: sql.Float, value: request.body.bobot},
      {name: 'target', sqlType: sql.Float, value: request.body.target},
      {name: 'capaian', sqlType: sql.Float, value: request.body.capaian},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update}
   ];

   var query = "UPDATE [Indikator_SatuanKerja] SET id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, target = @target, capaian = @capaian, last_update = CONVERT(varchar, GETDATE(), 20) WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Indikator Satuan Kerja
app.delete('/api/indikator-satuan-kerja/:id', function(request, response){
   console.log("Query: Delete Indikator_SatuanKerja Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Indikator_SatuanKerja] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Indikator Satuan Kerja Log
// Get Indikator Satuan Kerja Log
app.get('/api/indikator-satuan-kerja-log', function(request, response){
   var query = "SELECT * FROM [Indikator_SatuanKerja_Log]";
   execute.execQuery(query, response, null);
});

// Indikator Satuan Kerja List
app.get('/api/indikator-satuan-kerja-list', function(request, response){
   var query = "SELECT id, nama as name FROM [Indikator_SatuanKerja]";
   execute.execQuery(query, response, null);
});

// Delete Indikator Satuan Kerja Log
app.delete('/api/indikator-satuan-kerja-log/:id', function(request, response){
   console.log("Query: Delete Indikator_SatuanKerja_Log Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Indikator_SatuanKerja_Log] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Jenis SatKer
// Get Jenis Satuan Kerja
app.get('/api/jenis-satuan-kerja', function(request, response){
   var query = "SELECT * FROM [JenisSatker]";
   execute.execQuery(query, response, null);
});

// Insert Jenis Satuan Kerja
app.post('/api/jenis-satuan-kerja', function(request, response){
   console.log("Query: Insert Jenis Satuan Kerja Data");
   var query = "INSERT INTO [JenisSatker](nama, create_date, last_update, expired_date) VALUES('', CONVERT(varchar, GETDATE(), 20), CONVERT(varchar, GETDATE(), 20), '')";
   execute.execQuery(query, response, null);
});

// Update Jenis Satuan Kerja
app.put('/api/jenis-satuan-kerja/:id', function(request, response){
   console.log("Query: Update Jenis Satuan Kerja Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'create_date', sqlType: sql.VarChar, value: request.body.create_date},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update},
      {name: 'expired_date', sqlType: sql.VarChar, value: request.body.expired_date}
   ];

   var query = "UPDATE [JenisSatker] SET nama = @nama, create_date = @create_date, last_update = CONVERT(varchar, GETDATE(), 20), expired_date = @expired_date WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Jenis Satuan Kerja
app.delete('/api/jenis-satuan-kerja/:id', function(request, response){
   console.log("Query: Delete Jenis Satuan Kerja Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [JenisSatker] WHERE id = @id";
   execute.execQuery(query, response, param);
});

// CRUD Master Indikator
// Get Master Indikator
app.get('/api/master-indikator', function(request, response){
   var query = "SELECT * FROM [MasterIndikator]";
   execute.execQuery(query, response, null);
});

// Insert Master Indikator
app.post('/api/master-indikator', function(request, response){
   console.log("Query: Insert Master Indikator Data");
   var query = "INSERT INTO [MasterIndikator](id_aspek, id_komponen_aspek, nama, deskripsi, id_pembilang, id_penyebut, default_bobot, create_date, last_update, expired_date) VALUES('', '', '', '', '', '', '', CONVERT(varchar, GETDATE(), 20), CONVERT(varchar, GETDATE(), 20), '')";
   execute.execQuery(query, response, null);
});

// Update Master Indikator
app.put('/api/master-indikator/:id', function(request, response){
   console.log("Query: Update Master Indikator Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'id_aspek', sqlType: sql.Int, value: request.body.id_aspek},
      {name: 'id_komponen_aspek', sqlType: sql.Int, value: request.body.id_komponen_aspek},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'deskripsi', sqlType: sql.VarChar, value: request.body.deskripsi},
      {name: 'id_pembilang', sqlType: sql.Int, value: request.body.id_pembilang},
      {name: 'id_penyebut', sqlType: sql.Int, value: request.body.id_penyebut},
      {name: 'default_bobot', sqlType: sql.VarChar, value: request.body.default_bobot},
      {name: 'create_date', sqlType: sql.VarChar, value: request.body.create_date},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update},
      {name: 'expired_date', sqlType: sql.VarChar, value: request.body.expired_date}
   ];

   var query = "UPDATE [MasterIndikator] SET id_aspek = @id_aspek, id_komponen_aspek = @id_komponen_aspek, nama = @nama, deskripsi = @deskripsi, id_pembilang = @id_pembilang, id_penyebut = @id_penyebut, default_bobot = @default_bobot, create_date = @create_date, last_update = CONVERT(varchar, GETDATE(), 20), expired_date = @expired_date WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Master Indikator
app.delete('/api/master-indikator/:id', function(request, response){
   console.log("Query: Delete Master Indikator Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [MasterIndikator] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Periode
// Get Periode
app.get('/api/periode', function(request, response){
   var query = "SELECT * FROM [Periode]";
   execute.execQuery(query, response, null);
});

// Insert Periode
app.post('/api/periode', function(request, response){
   console.log("Query: Insert Periode Data");
   var query = "INSERT INTO [Periode](nama, create_date, last_update) VALUES('', CONVERT(varchar, GETDATE(), 20), CONVERT(varchar, GETDATE(), 20))";
   execute.execQuery(query, response, null);
});

// Update Periode
app.put('/api/periode/:id', function(request, response){
   console.log("Query: Update Jenis Satuan Kerja Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'create_date', sqlType: sql.VarChar, value: request.body.create_date},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update}
   ];

   var query = "UPDATE [Periode] SET nama = @nama, create_date = @create_date, last_update = CONVERT(varchar, GETDATE(), 20) WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Periode
app.delete('/api/periode/:id', function(request, response){
   console.log("Query: Delete Periode Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Periode] WHERE id = @id";
   execute.execQuery(query, response, param);
});

// CRUD Satuan Kerja
// Get Satuan Kerja
app.get('/api/satuan-kerja', function(request, response){
   var query = "SELECT * FROM [SatuanKerja]";
   execute.execQuery(query, response, null);
});

// Jenis Satuan Kerja List
app.get('/api/jenis-satuan-kerja-list', function(request, response){
   var query = "SELECT id, nama as name FROM [JenisSatker]";
   execute.execQuery(query, response, null);
});

// Indikator Satuan Kerja List
// app.get('/api/indikator-satuan-kerja-list', function(request, response){
//    var query = "SELECT id, nama as name FROM [Indikator_SatuanKerja]";
//    execute.execQuery(query, response, null);
// });

// Insert Satuan Kerja
app.post('/api/satuan-kerja', function(request, response){
   console.log("Query: Insert Satuan Kerja Data");
   var query = "INSERT INTO [SatuanKerja](id_satker, nama, level_unit, id_induk_satker, id_jns_satker, create_date, last_update, expired_date) VALUES('', '', '', '', '', CONVERT(varchar, GETDATE(), 20), CONVERT(varchar, GETDATE(), 20), '')";
   execute.execQuery(query, response, null);
});

// Update Satuan Kerja
app.put('/api/satuan-kerja/:id', function(request, response){
   console.log("Query: Update Satuan Kerja Data");

   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'id_satker', sqlType: sql.VarChar, value: request.body.id_satker},
      {name: 'nama', sqlType: sql.VarChar, value: request.body.nama},
      {name: 'level_unit', sqlType: sql.Int, value: request.body.level_unit},
      {name: 'id_induk_satker', sqlType: sql.VarChar, value: request.body.id_induk_satker},
      {name: 'id_jns_satker', sqlType: sql.Int, value: request.body.id_jns_satker},
      {name: 'create_date', sqlType: sql.VarChar, value: request.body.create_date},
      {name: 'last_update', sqlType: sql.VarChar, value: request.body.last_update},
      {name: 'expired_date', sqlType: sql.VarChar, value: request.body.expired_date}
   ];

   var query = "UPDATE [SatuanKerja] SET id_satker = @id_satker, nama = @nama, level_unit = @level_unit, id_induk_satker = @id_induk_satker, id_jns_satker = @id_jns_satker, create_date = @create_date, last_update = CONVERT(varchar, GETDATE(), 20), expired_date = @expired_date WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Satuan Kerja
app.delete('/api/satuan-kerja/:id', function(request, response){
   console.log("Query: Delete Satuan Kerja Data");

   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [SatuanKerja] WHERE id = @id";
   execute.execQuery(query, response, param);
});


// CRUD Aspek
// Get Aspek
app.get('/api/aspek', function(request, response){
   var query = "SELECT * FROM [Aspek]";
   execute.execQuery(query, response, null);
});

// List Aspek
app.get('/api/aspek-list', function(request, response){
   var query = "SELECT id, aspek as name FROM [Aspek]";
   execute.execQuery(query, response, null);
});

// List Komponen Aspek
app.get('/api/komponen-aspek-list', function(request, response){
   var query = "SELECT id, komponen_aspek as name FROM [Aspek]";
   execute.execQuery(query, response, null);
});

// Insert Aspek
app.post('/api/aspek', function(request, response){
   console.log("Query: Insert Aspek Data");
   var query = "INSERT INTO [Aspek](aspek, komponen_aspek) VALUES('', '')";
   execute.execQuery(query, response, null);
});

// Update Aspek
app.put('/api/aspek/:id', function(request, response){
   console.log("Query: Update Aspek Data");
   // Parameter
   var param = [
      {name: 'id', sqlType: sql.Int, value: request.params.id},
      {name: 'aspek', sqlType: sql.VarChar, value: request.body.aspek},
      {name: 'komponen_aspek', sqlType: sql.VarChar, value: request.body.komponen_aspek},
   ];
   var query = "UPDATE [Aspek] SET aspek = @aspek, komponen_aspek = @komponen_aspek WHERE id = @id";
   execute.execQuery(query, response, param);
});

// Delete Aspek
app.delete('/api/aspek/:id', function(request, response){
   console.log("Query: Delete Aspek Data");
   // Parameter
   var param = [{name: 'id', sqlType: sql.Int, value: request.params.id}];
   var query = "DELETE FROM [Aspek] WHERE id = @id";
   execute.execQuery(query, response, param);

});

// List Dosen
app.get('/api/dosen', function(request, response){
   var query = "SELECT * FROM [Dosen]";
   execute.execQuery(query, response, null);
});

// List Abmas
app.get('/api/abmas', function(request, response){
   var query = "SELECT * FROM [Abmas]";
   execute.execQuery(query, response, null);
});

// List Penelitian
app.get('/api/penelitian', function(request, response){
   var query = "SELECT * FROM [Penelitian]";
   execute.execQuery(query, response, null);
});

// List Publikasi
app.get('/api/publikasi', function(request, response){
   var query = "SELECT * FROM [Publikasi]";
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

