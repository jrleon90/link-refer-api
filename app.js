require('dotenv').config();
const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load Routes
require('./routes')(app);

app.use('/', (req, res) =>{
    res.status(200).json({'Message':'Welcome to the Link refer API'})
})

module.exports = app;