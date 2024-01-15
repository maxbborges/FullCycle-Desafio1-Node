const express = require('express')
// const app = require('node-fastcgi');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
var connection = mysql.createConnection(config)

const sql = `CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT,name varchar(255),PRIMARY KEY (id));`
connection.query(sql)
const sql1 = `INSERT INTO people(name) values('Wesley');`
connection.query(sql1)
const sql2 = `select * from people`
peoples=[]
connection.query(sql2,function(err,result,fields){
    if (err) throw err;
    peoples = result
})
connection.end()

app.get('/', (req,res) => {
    html='<h1>Full Cycle Rocks!</h1>'
    peoples.forEach(function(el){
        html=html+'<br>- '+el.name
    });
    res.send(html)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

// app.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello FastCGI2!');
// }).listen(port);

// console.log('FastCGI server listening on port port');