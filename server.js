// Dependendcies
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//  Routes

// show index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// show notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });

// show notes 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// notes ID
app.get('/api/notes/:id', (req, res) => {
  let saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(saveNote[Number(req.params.id)]);
});

// save notes
app.post('/api/notes', (req, res) => {
  const saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
  const addNote = req.body;
  const noteId = (saveNote.length).toString();
  addNote.id = noteId;
  saveNote.push(addNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(saveNote));
  res.json(saveNote);
})

// BONUS
app.delete('/api/notes/:id', (req, res) => {

  // ...read all notes from the db.json file
  let saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
  let noteID = req.params.id;
  let newID = 0;

  // ...remove (filter out) the note with the given id property
  saveNote = saveNote.filter(selectedNote => {
      return selectedNote.id != noteID;
  })
  
   // ...rewrite the notes to the db.json file
  for (selectedNote of saveNote) {
      selectedNote.id = newID.toString();
      newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
  res.json(saveNote);
})

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });