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
    secret: 'ad;fljkadls;fkadsl;kf',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// root route to render the index.ejs view
app.get('/', function(req, res) {
    console.log("**********\nIndex");
    if (req.session.nviews) {
        console.log("Views: " + req.session.nviews);
    }
    else {
        req.session.nviews = 0;
    }
    // req.session.nviews += 1;
    res.render("index", { viewCounter: req.session.nviews });
})

// post route for adding n views via get
app.get('/views/add/:viewCount', function (req, res) {
    console.log("**********\nAdd Views via Get, req = ", req);
    console.log("viewCount = " + req.params.viewCount);
    // User clicked button in form to add 2 views to counter
    req.session.nviews += parseInt(req.params.viewCount);
    // Then redirect to the root route
    res.redirect('/');
})

// post route for adding n views via POST
app.post('/views/add/', function (req, res) {
    // console.log("**********\nAdd Views, Post req = ", req);
    console.log("**********\nAdd Views, Post req.body = ", req.body);

    if ('Add' in req.body) {
        var toadd = parseInt(req.body['viewsToAdd']);
        console.log("Adding " + toadd.toString() + " views");
        req.session.nviews += toadd;
    }
    else if ('Reset' in req.body) {
        console.log("Clearing views");
        req.session.nviews = 0;
    }
    else {
        console.log("!!!! UNKNOWN !!!!");
    }

    // Then redirect to the root route
    res.redirect('/');
})

// post route for resetting views via get
app.get('/views/reset', function (req, res) {
    console.log("**********\nReset Views via Get, req = ", req);
    // User clicked button in form to add 2 views to counter
    req.session.nviews = 0;
    // Then redirect to the root route
    res.redirect('/');
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});




