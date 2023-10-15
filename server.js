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
