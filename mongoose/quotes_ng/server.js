var express = require("express");
var app = express();
var session=require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/quote_dojo';
// var Schema = mongoose.Schema;

// Compile model from schema
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

//need to load this once
var models = require('./server/models'); //invokes /server/models/index.js
// builds QuoteModel for app
// var QuoteModel = mongoose.model('QuoteModel');

// setup session for 60 seconds
app.use(session({
    secret: '^&*%^&$%^%^&&*(*()',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

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
// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument
require('./server/config/routes.js')(app)
// the routes also requires the contollers/quotes.js file


// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nQUOTES: Node.js Server Listening on Port 8000 .. " + formatDate(new Date()));
});
