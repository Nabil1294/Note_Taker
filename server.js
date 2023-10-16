// import dependencies to run app
const express = require('express');
const fs = require('fs');
const path = require('path');
// importing uniqid to add id to notes
const uniqid = require('uniqid');
// config express
const app = express();
const PORT = process.env.PORT || 3001;
// adding necessary middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// adding static middleware to use files in public
app.use(express.static('public'));

// adding routes to html pages

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'), (err) => {
        if(err) throw err;
    });
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// Create new post request to add notes 
app.post('/api/notes', (req, res) => {
    // creating new note
    var note = req.body;
    // adding unique id to each note
    note.id = uniqid();
    // Read the contents of the JSON file
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'));
    // Parse the JSON data into a JavaScript object
    const jsonData = JSON.parse(data);
    // adding new note to array
    jsonData.push(note);
    // adding updated array to db.json file and looking for err
    try {
        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(jsonData));
        console.log(`File saved and note ID is added ${note.id}`);
    } catch (err) {
        console.error("Failed to save the file:", err);
    }
    // sending db.json file with new notes added
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// removing note from notes array in db file
app.delete('/api/notes/:id', (req, res) => {
    // get data from db file
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'));
    // Parse the JSON data into a JavaScript object
    const jsonData = JSON.parse(data);
    // looking for the note id that matches the requested note id
    const noteIndex = jsonData.findIndex(note => note.id === req.params.id);
    // removing selected note
    jsonData.splice(noteIndex, 1);
    // adding updated array to db.json file and looking for err
    try {
        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(jsonData));
        console.log(`File updated and note has been removed ${req.params.id}`);
    } catch (err) {
        console.error("Failed to remove note:", err);
    }
    // sending db.json file with new notes added
    res.sendFile(path.join(__dirname, './db/db.json'));
})


// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));