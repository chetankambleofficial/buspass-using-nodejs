const mysql = require('mysql2');
const express = require('express');
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'chetank',
    database: 'buspass',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    const buspassData = req.body;

    // Insert data into the MySQL database
    pool.query(
        'INSERT INTO BUSPASS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            buspassData.name,
            buspassData.fname,
            buspassData.Mobile,
            buspassData.dob,
            buspassData.college,
            buspassData.gender,
            buspassData.adhaar,
            buspassData.cat,
            buspassData.from,
            buspassData.to,
            buspassData.change,
            buspassData.todate
        ],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error storing data in the database');
            } else {
                console.log('Data stored in the database');
               
            }
        }
    );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
