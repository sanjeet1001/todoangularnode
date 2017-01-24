var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
 // var Request = require('tedious').Request;  
 //   var TYPES = require('tedious').TYPES; 


 /* var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'sanjeet',  
        password: '@Aa12345',  
        server: 'sanjeettodo.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'todo'}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
        console.log("Connected");  
    }); 
*/
/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sanjeettodo.database.windows.net',
  user     : 'sanjeet',
  password : '@Aa12345',
  database : 'todo'
});

connection.connect();
*/






var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var sql = require('mssql');

var config = {
    user: 'Dev@snrdev',
    password: 'snr@1234',
    server: '192.168.0.40',
    database: 'sanjeettestdb',

    options: {
        encrypt: true
    }
};




app.use(cors());
var result = "";  
var sanjeet = {
  name : 'sanjeet'
};
app.get('/list',function(req,res){
  sql.connect(config).then(function() {
    // Query

    new sql.Request()
    .query('select * from todousers').then(function(recordset) {
        res.json(recordset);
    }).catch(function(err) {
        res.send(err);
    });
    }).catch(function(err) {
        res.send(err);
    });
})

app.put('/update',function(req,res){

    var id=req.body.ID;
    var status;
    if(req.body.Status =="Incomplete"){
        status = "'Completed'";
    }
    else{
        status = "'Incomplete'";
    }
    sql.connect(config).then(function() {
    // Query
    var request = new sql.Request();
    var updatedata = "update todousers set TaskStatus ="+status+ " where Id ='"+id+"'"; 
    request.query(updatedata, function(err, recordset, affected) {
        res.send(200,"ok");
    });



    }).catch(function(err) {
        res.send(err);
    });
})

app.post('/newtask',function(req,res){
  sql.connect(config).then(function(){
      var request = new sql.Request();
      var newdata = "insert into todousers values( NEWID(),'"+req.body.data.tname+"','"+req.body.data.tassign+"','"+req.body.data.tdate+"','"+req.body.data.tstatus+"')";
      request.query(newdata,function(err,recordset,affected){
          res.send(200,"ok");
      })
  })
});
app.post('/deletetask',function(req,res){
  sql.connect(config).then(function(){
      var request = new sql.Request();
      var deleteq = "delete from todousers where id = '"+req.body.data+"'";
      request.query(deleteq,function(err,data,affected){
          res.send(200,"ok");
      })
  })
});
app.use(express.static(__dirname+'/app'));


app.listen(process.env.PORT ||7878,function(req,res){
    console.log('server started');
})
