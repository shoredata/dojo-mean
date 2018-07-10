var express = require("express");
var app = express();
var session=require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/quote_dojo';
var Schema = mongoose.Schema;
var QuoteModelSchema = new Schema({
    name: { type: String, required: true, trim: true, min: 5, max: 100 },
    quote: { type: String, required: true, trim: true, min: 5, max: 1024 },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, required: true, default: Date.now }
});
// Compile model from schema
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
var QuoteModel = mongoose.model('QuoteModel', QuoteModelSchema);

// setup session for 60 seconds
app.use(session({
    secret: '^&*%^&$%^%^&&*(*()',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
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

function handleError(error){
    console.log("LOG=Error:", error.message);
    // console.error("ERROR=Error:", error);
}


// ROUTES  -----------------------------------------------------

// root route to render the index.ejs view
app.get('/', function(req, res) {
    if (req.session.errors==null) { 
        req.session.errors = [];
    } 
    var all_errors = req.session.errors;
    res.render("index", { errors: all_errors });
})

// get route for listing quotes
app.get('/quotes', function (req, res) {
    // console.log("GET: requesting all quotes", req);
    req.session.errors = [];
    req.session.errors.length = 0;
    console.log("GET: requesting all quotes");

    var currentQuotes = mongoose.model('QuoteModel', QuoteModelSchema);
    currentQuotes.find({}).sort('-created_at').exec(function (err, all_quotes) {
        if (err) {
            req.session.errors.length = 0;
            handleError(err);
            req.session.errors = err;
            res.redirect('/'); //show errors
        }
        else {
            res.render('quotes', { quotes: all_quotes });
        }
    });
})

// post route for adding a quote
app.post('/quotes', function (req, res) {
    req.session.errors = [];
    req.session.errors.length = 0;
    if ('list' in req.body) {
        console.log("POST: Requesting List of quotes");
        res.redirect('/quotes'); //show all quotes
    }
    else {
        console.log("POST: inserting a quote", req.body);
        console.log("  Name: ", req.body.name);
        console.log("  Quote: ", req.body.quote);

        QuoteModel.create({ 
            name: req.body.name,
            quote: req.body.quote
        }, function (err, new_quote_model) {
            if (err){
                req.session.errors.length = 0;
                handleError(err);
                req.session.errors = err;
                res.redirect('/'); //show errors
            } 
            else {
                // saved!
                console.log("Quote Saved!");
                res.redirect('/quotes'); //show all quotes
            }
        });
    }
})


// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nQUOTES: Node.js Server Listening on Port 8000 .. " + formatDate(new Date()));
});
