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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'), (err) => {
        if(err) throw err;
    });
});



















// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));