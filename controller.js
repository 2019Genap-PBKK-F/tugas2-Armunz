var express = require('express');
var mssql = require('mssql');
var dbConfig = require('./config');

module.exports.execQuery = function(req, res){
    var exec = mssql.connect(dbConfig, function(err){
        if(err){
            res.end("Connection error " + err);
        }
        else{
            var request = new mssql.Request();
            request.query(req, function(err, response){
                if(err){
                    console.log("Query error");
                }
                else{
                    res.send(response.recordset);
                }
            });
        }
    });
    return exec;
}    
    