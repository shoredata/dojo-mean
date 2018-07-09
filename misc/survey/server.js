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
        req.session.name = req.body.name;
        req.session.language = req.body.language;
        req.session.location = req.body.location;
        req.session.comment = req.body.comment;

        // Then redirect to the success route
        res.redirect('/success');
    }
    else {
        console.log("!!!! UNKNOWN !!!!");
        // Then redirect to the root route
        res.redirect('/');
    }

})



// root route to render the index.ejs view
app.get('/numbers', function (req, res) {
    console.log("**********\nNumber Guessing Game index");
    // console.log("req.session = " + req.session);

    if (!req.session.guess_value) { 
        req.session.guess_value = 0;
        req.session.guess_actualvalue = 0;
        req.session.guess_state = 0;
    } 

    var guess_data = {
        client: req.session.guess_value,
        server: req.session.guess_actualvalue,
        state: req.session.guess_state
    }

    res.render("numbers", { guess: guess_data });
})


app.post('/numbers/add', function (req, res) {
    console.log("**********\nAdd Guess, Post req.body = ", req.body);

    if ('submit_guess' in req.body) {

        if (req.body.guessed_value.length == 0 )
        {
            var guess = Math.floor(Math.random() * 100) + 1;
            req.session.guess_value = guess;
            console.log("YOU ARE LAZY >> " + guess)
        }
        else {
            req.session.guess_value = req.body.guessed_value;

            // Then redirect to the numberrs rout to render results
        }
        var serv = Math.floor(Math.random() * 100) + 1;
        req.session.guess_actualvalue = serv;
        if (req.session.guess_value < req.session.guess_actualvalue) {
            req.session.guess_state = "blue";  // guess too low
            console.log("low ... Server was thinking of " + serv);
        }
        else if (req.session.guess_value > req.session.guess_actualvalue) {
            req.session.guess_state = "red";  // guess too high
            console.log("high ... Server was thinking of " + serv);
        }
        else {
            req.session.guess_state = "green";  // guess perfect
            console.log("PERFECT ... Server was thinking of " + serv);
        }
        res.redirect('/numbers');
    }
else {
        console.log("!!!! UNKNOWN !!!!");
        // Then redirect to the root route
        res.redirect('/');
    }

})



app.get('/ninjagold', function (req, res) {
    console.log("**********\nNinja Gold Game");
    // console.log("req.session = " + req.session);

    if (req.session.gold_total==null) {
        console.log("### SESSION TIMEOUT ########################################################################");
        req.session.gold_total = 0;
        req.session.actions = [];
        req.session.save();
    }
    else if (typeof req.session.gold_total === 'undefined' || !req.session.gold_total) { 
        console.log("*** SESSION TIMEOUT ***********************************************************************");
        req.session.gold_total = 0;
        req.session.actions = [];
        req.session.save();
    }

    var gold_data = {
        gold: req.session.gold_total,
        actions: req.session.actions
    }

    res.render("ninjagold", { golddata: gold_data });
})

app.post('/ninjagold/update', function (req, res) {
    console.log("**********\nNinjaGold Update, Post req.body = ", req.body);

    if (req.session.gold_total == null) {
        res.redirect('/ninjagold');
        return;
    }
    else if (typeof req.session.gold_total === 'undefined' || !req.session.gold_total) { 
        // res.redirect('/ninjagold');
        // return;
    }
    else
    {
        // console.log(" ====== current: " + req.session.gold_total);
    }
    var limits = [];
    var source = "";
    var color = "";

    if ('farm' in req.body) {
        source = "Farm";
        limits.push(10);
        limits.push(20);
    }
    else if ('cave' in req.body) {
        source = "Cave";
        limits.push(5);
        limits.push(10);
    }
    else if ('house' in req.body) {
        source = "House";
        limits.push(2);
        limits.push(5);
    }
    else if ('casino' in req.body) {
        source = "Casino";
        limits.push(-50);
        limits.push(50);
    }
    else if ('reset' in req.body) {
        req.session.gold_total = 0;
        req.session.actions = {};
        req.session.save();
        res.redirect('/ninjagold');
        return;
    }


    var objToday = new Date(),
        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = stoday + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var stoday = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;


    var amount = Math.floor(Math.random() * (limits[1] - limits[0])) + limits[0];
    console.log("result = " + amount.toString());
    req.session.gold_total += amount;
    var sout = source + ", " + amount + " " + stoday;
    var scolor = "";
    if (amount > 0) {
        sout = "Welcome to the " + source + "! You made " + amount.toString() + " gold!   " + stoday;
        scolor = "green";
    }
    else if (amount<0) {
        sout = "Oh Boy - In the " + source + " you lost " + Math.abs(amount).toString() + " gold.   " + stoday;
        scolor = "red";
    }
    else {
        sout = "Um, you broke even in the " + source + ".   " + stoday;
        scolor = "yellow";
    }
    var thisaction = [];
    thisaction.push(sout);
    thisaction.push(scolor);
    req.session.actions.splice(0, 0, thisaction);
    req.session.save();

    // console.log(req.session.actions);

    res.redirect('/ninjagold');

})



// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});


