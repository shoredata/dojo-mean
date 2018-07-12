// Whole-script strict mode syntax
'use strict';

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/bear_dojo';
var models = require('./server/models'); //invokes /server/models/index.js

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// HELPERS -----------------------------------------------------

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

// ROUTES  -----------------------------------------------------
require('./server/config/routes.js')(app)




// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nQUOTES: Node.js Server Listening on Port 8000 .. " + formatDate(new Date()));
});


