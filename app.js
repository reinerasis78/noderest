var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.get('/',(req,res)=>{
    fs.readFile('data.txt',(err,data)=>{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.send(data);
    })
})
app.post('/',(req,res)=>{
    res.send("post");
})
app.put('/',(req,res)=>{
    res.send("put");
})
app.delete('/',(req,res)=>{
    res.send("delete");
})

app.listen(3000,()=>console.log("connection to server stablished"));