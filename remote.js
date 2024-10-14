const speakeasy = require('speakeasy');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const port = 8092;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); 

app.listen(port, ()=>{
    console.log('Server running...');
})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
});

db.on('error', (err)=>{
    console.log("DB Connection failed, \nError: " + err);
})
db.on('connect', (stream)=>{
    console.log('DB connected!');
})

function runThis(){
    // const sql = `SELECT * FROM tracking`
    // const sql = `DELETE FROM tracking WHERE id != 432`
    // const sql = `delete from tracking WHERE id !='401'`;
    // const sql = `select * from cattle`;
    // const sql = `truncate tracking`;
    const sql = "truncate monitoring";
    db.query(sql, (err, data)=>{
        console.log('in query...');
        if (err) console.log("\nFailed to fetch tracking information \nError: " + err.sqlMessage);
        console.log('done');
        
    })
}
runThis()