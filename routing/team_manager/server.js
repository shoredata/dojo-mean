'use strict';

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');

// DATABASE -----------------------------------------------------
var mongoDB = 'mongodb://127.0.0.1:27017/team_manager_dojo';

var models = require('./server/models');      //invokes /server/models/index.js
var utils = require('./server/config/utils');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

// MONGOD -----------------------------------------------------
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// ROUTES -----------------------------------------------------
require('./server/config/routes')(app) // processes all express routes

// LISTENER -----------------------------------------------------
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\n[ TEAM MANAGER ]  API Server Listening on Port 8000 ... " + utils.formatDate(new Date()));
});

