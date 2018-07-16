// Whole-script strict mode syntax
'use strict';

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/restful_api2_dojo';
var models = require('./server/models'); //invokes /server/models/index.js
var utils = require('./utils');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//this root of dist needs to match s path
app.use(express.static( __dirname + '/public/dist/public' ));

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// ROUTES  -----------------------------------------------------
require('./server/config/routes.js')(app)


// LISTENER -----------------------------------------------------
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\n[ TASK API 2 ]   Restful API: Node/MongoDB/Express Server Listening on Port 8000 .. " + utils.formatDate(new Date()));
});


