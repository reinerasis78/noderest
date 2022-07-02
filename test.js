var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const { getUnpackedSettings } = require('http2');

app.use(bodyParser.urlencoded({ extended: false }))
app.get('/',(req,res)=>{
    fs.readFile('./data.txt','utf8',(err,data)=>{
        if (err) throw err;
        let datas = JSON.parse(data);
        let template = '';
        for (const employee of datas['employee']) {
            let name = employee.name;
            let salary = employee.salary;
            template +=  `Employee ${name} current salary is ${salary} <br>`;
        }
        res.send(template);
    })
})
app.post('/',(req,res)=>{
    fs.readFile('./data.txt','utf8',(err,data)=>{
        if (err) throw err;
        let datas = JSON.parse(data);
        datas['employee'].push({"name":req.body.name,"salary":req.body.salary,"married":false})
        fs.writeFile('./data.txt', JSON.stringify(datas), function (err) {
            if (err) throw err;
            res.send("employee added");
        });
    })
    
})
app.put('/',(req,res)=>{
    fs.readFile('./data.txt','utf8',(err,data)=>{
        if (err) throw err;
        let datas = JSON.parse(data);
        let index = null;
        for (var i=0; i < datas['employee'].length; i++) {
            let name = datas['employee'][i].name;
            if(name == req.body.name){
                index = i; 
            }
        }
        if(index != null){
            datas['employee'][index].name = req.body.name;
            datas['employee'][index].salary = req.body.salary;
            datas['employee'][index].married = req.body.married;
            fs.writeFile('./data.txt', JSON.stringify(datas), function (err) {
                if (err) throw err;
                res.send("employee updated");
            });
        }
        // res.send("put");
    })

})
app.delete('/',(req,res)=>{
    fs.readFile('./data.txt','utf8',(err,data)=>{
        if (err) throw err;
        let datas = JSON.parse(data);
        let index = null;
        for (var i=0; i < datas['employee'].length; i++) {
            let name = datas['employee'][i].name;
            if(name == req.body.name){
                index = i; 
            }
        }
        if(index != null){
            datas['employee'].splice(index,1);
            
            fs.writeFile('./data.txt', JSON.stringify(datas), function (err) {
                if (err) throw err;
                res.send(`user deleted`);
            });
        }
    })
    
})

app.listen(3000,()=>console.log("connection to server stablished"));