// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.set('json escape', true);
app.use(cors());
app.use(express.json());

//connecting to database
const db = new sqlite3.Database('./questions.db',(err) => {
    if (err) {
        console.error('Error connecting:', err);
    } else {
        console.log('Connected to database');
    }
});

//API endpoints for each table
//mercury
app.get('/api/mercury_questions', (req, res) => {
    db.all('SELECT * FROM mercury_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        console.log('done')
        res.json(rows);
    });
});
//venus
app.get('/api/venus_questions', (req, res) => {
    db.all('SELECT * FROM venus_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//earth
app.get('/api/earth_questions', (req, res) => {
    db.all('SELECT * FROM earth_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//mars
app.get('/api/mars_questions', (req, res) => {
    db.all('SELECT * FROM mars_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//jupiter
app.get('/api/jupiter_questions', (req, res) => {
    db.all('SELECT * FROM jupiter_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//saturn
app.get('/api/saturn_questions', (req, res) => {
    db.all('SELECT * FROM saturn_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//uranus
app.get('/api/uranus_questions', (req, res) => {
    db.all('SELECT * FROM uranus_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
//neptune
app.get('/api/neptune_questions', (req, res) => {
    db.all('SELECT * FROM neptune_questions', [], (err, rows) => {
        if (err)
        {
            res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
