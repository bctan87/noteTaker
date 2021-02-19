// Dependendcies
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Notes Array Data



//  Routes

// index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });