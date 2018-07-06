// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();

//init session module
var session = require('express-session');

//init body-parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// setup session for 60 minutes
app.use(session({
    secret: 'whatEver..<><((',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


// root route to render the index.ejs view
app.get('/', function(req, res) {
    console.log("**********\nIndex");
    res.render("index",);
})

// root route to render the index.ejs view
app.get('/success', function (req, res) {
    console.log("**********\nSuccess after /survey/add via POST");
    console.log("req.session = " + req.session);
    var survey_data = {
        name: req.session.name, 
        lang: req.session.language, 
        loc: req.session.location, 
        comm: req.session.comment
    }
    res.render("success", { thisentry: survey_data });
})


// post route for adding n views via POST
app.post('/survey/add/', function (req, res) {
    console.log("**********\nAdd Survey, Post req.body = ", req.body);

    if ('add' in req.body) {
        req.session.name = "name";
        req.session.language = "lang";
        req.session.location = "loca";
        req.session.comment = "comm";

        // Then redirect to the success route
        res.redirect('/success');
    }
    else {
        console.log("!!!! UNKNOWN !!!!");
        // Then redirect to the root route
        res.redirect('/');
    }

})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});


