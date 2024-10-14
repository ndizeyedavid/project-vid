const speakeasy = require('speakeasy');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

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


app.get('/', (req, res)=>{
    res.json({message: "Server is running"});
})

app.get('/data', (req, res)=>{
    const sql = "SELECT * FROM monitoring ORDER BY id DESC";
    db.query(sql, (err, result)=>{
        if (err) return res.json({error: "Failed to fetch monitoring data"});

        res.json(result);
    })
})