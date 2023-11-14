const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host:'localhost',
  user : 'root',
  password:'0000',
  database:'member'
});

const app = express();

const HOST_NAME = "127.0.0.1";
const PORT = 9999;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
  res.redirect("/student");
});

app.post("/student/add", (req,res)=>{
  const data = req.body;
  db.query(`insert into student( _id ,name, belong, phone, status) values('${data.id}','${data.name}', '${data.belong}', '${data.phone}', ${data.status});`, (err, rows)=>{
    if(err) throw err;
    res.header("Content-Type", "text/plain");
    res.statusCode = 200;
    res.send("추가 완료");
  });
});

app.get("/student", (req,res)=>{
  db.query('select * from student', (err, rows)=>{
    if(err) throw err;
    res.header("Content-Type", "application/json");
    res.statusCode = 200;
    res.send(rows);
  });
});

app.get("/user", (req,res)=>{
  db.query('select * from user', (err, rows)=>{
    if(err) throw err;
    res.header("Content-Type", "application/json");
    res.statusCode = 200;
    res.send(rows);
  });
});

app.listen(PORT, ()=>{
  console.log(`====== Server is running : http://${HOST_NAME}:${PORT}`);
});

