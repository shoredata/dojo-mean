// Whole-script strict mode syntax
'use strict';

var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var validate = require('mongoose-validator')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const express_validator = require('express-validator');
const flash = require('connect-flash');

var assert = require('assert');

// mc::
// app.use(session({
//     secret: 'dsafasdfasadfadsf^%^&&*(*()',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
// }))
// traversy::
app.use(session({
    secret: 'dsafasdfasaasdfasdf()',
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

function dateofbirth_validator (value) {
    return value.startDate <= Date.now;
}
    
// https://stackoverflow.com/questions/15012250/handling-mongoose-validation-errors-where-and-how

var mongoDB = 'mongodb://127.0.0.1:27017/login_1_dojo';
var Schema = mongoose.Schema;
var login_schema = new Schema(); //all validations done via register_schema, clever if you ask me
login_schema.add({
    email: { 
        type: String, 
        minlength: 5,
        maxlength: 64,
        required: true,
        trim: true,
        lowercase: true
    },
    first_name: { 
        type: String, 
        minlength: 1,
        maxlength: 64,
        required: true,
        trim: true
    },
    last_name: {
        type: String, 
        minlength: 1,
        maxlength: 64,
        required: true,
        trim: true
    },
    dateofbirth: { // should be in past 
        type: Date,
        required: true,
    },   
    hashpw: { //bcrypt hash, not pw
        type: String },      
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});


var register_schema = new Schema();
register_schema.add({
    email: { 
        type: String, 
        minlength: 5,
        maxlength: 64,
        required: true,
        trim: true,
        lowercase: true,
        validate:     {
            validator: function(e) {
                // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
                // As it currently stands, nameRegex isn't a regex but a string and String doesn't have test functon which is why you are getting that error.
                // Remove the quotes around your regex. That is the literal form of regex.
                // refer to https://gist.github.com/gregseth/5582254
                var email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                // var email_regex_2 = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
                // First argument is a boolean, whether validator succeeded
                // 2nd argument is an optional error message override
                console.log("Verifying email via regex");
                return email_regex.test(e);
            },
            message: "email must conform to RFC2822, see gist.github.com/gregseth/5582254"
        }
    },
    first_name: { 
        type: String, 
        minlength: 1,
        maxlength: 64,
        required: true,
        trim: true
    },
    last_name: {
        type: String, 
        minlength: 1,
        maxlength: 64,
        required: true,
        trim: true
    },
    dateofbirth: { // should be in past 
        type: Date,
        required: true,
        validate: {
            validator: function (d) {
                console.log("Verifying birthdate in past (at least before NOW)");
                return d < Date.now();
            },
            message: 'Your birthdate must be in the past'
        }
    },   
    password1: {
        type: String, 
        minlength: [8, 'password1 is too short'],
        maxlength: [64, 'password1 is too long'],
        required: true,
        validate:     {
            validator: function(v) {
                // As it currently stands, nameRegex isn't a regex but a string and String doesn't have test functon which is why you are getting that error.
                // Remove the quotes around your regex. That is the literal form of regex.
                // from here: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
                // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                // First argument is a boolean, whether validator succeeded
                // 2nd argument is an optional error message override
                console.log("Verifying password via regex");
                return password_regex.test(v);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: "password1 contians invalid chars: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        }

    },        
    password2: {
        type: String, 
        minlength: [8, 'password2 is too short'],
        maxlength: [64, 'password2 is too long'],
        required: true,
        validate: {
            validator: function (p) {
                console.log("Verifying passwords match");
                return p==this.password1;
            },
            message: 'The entered passwords must match'
        }

    }        
});



// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// also here: http://mongoosejs.com/docs/guide.html
var login_model = mongoose.model('login_model', login_schema);
var register_model = mongoose.model('register_model', register_schema);

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express_validator()); 

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// HELPERS -----------------------------------------------------

function format_date(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}
// time looks like this:                                    vvvvvvvvvvvvvvvvvvvv
// *************************************************
// LOGIN+REGISTRATION Node Server Listening on Port 8000 .. 7/10/2018 2:11:13 pm

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

function handleError(error){
    // console.log("LOG=Error:", error.message);
    console.log("LOG=Error:", error);
}

// flash message example usages:
// req.flash("success", "Index rendered " + format_date(new Date()));
// req.flash("warning", "Index rendered " + format_date(new Date()));
// req.flash("danger", "Index rendered " + format_date(new Date()));



// ROUTES  -----------------------------------------------------

// 1. list all messages = index
app.get('/', function(req, res) {
    console.log(Array(50).join("*") + "\nGET", "/", "index.ejs", "Login/Register Forms.. " + format_date(new Date()));
    res.render("index");
})

// 2a. submit login request  via POST
app.post('/login', function (req, res) {
    console.log(Array(50).join("*") + "\nPOST", "/login", "Login via post:.. " + format_date(new Date()));
    console.log(req.body);

    req.checkBody('email','EMail is required').notEmpty();
    req.checkBody('password','Passsword is required').notEmpty();
    let errors = req.validationErrors();
    if (errors){
        console.log(errors);
        for (var e in errors){
            console.log(errors[e].location, ":", errors[e].msg);
            req.flash("danger", "Login Error: " + errors[e].msg);
        }
        res.redirect('/'); 
        return;
    }

    console.log("Searching for email address ... 1");
    login_model.findOne({ email: req.body.email }, function (err, email_test) {
        console.log("Searching email address ... 2");
        if (email_test) {
            // req.flash("success", "Login: Email exists!");
            console.log(email_test);
            console.log(req.body);
            
            // var pass1 = req.body.password;
            var out1a = bcrypt.compareSync(req.body.password, email_test.hashpw); // true
            console.log("ACT:", req.body.password, out1a);
            // req.flash("warning", out1a.toString() + " " + format_date(new Date()));
            if (out1a){
                req.flash("success", "Successful login for " + email_test.email + " at " + format_date(new Date()));
            }
            else {
                req.flash("danger", "Invalid uername/password");
            }
            res.redirect('/'); 
            return;

        }
        else if (err){
            console.log("Testing email address ... 5");
            console.log(err);
            console.log("Testing email address ... 6");
            //womp womp, some error = sad face
            req.flash("danger", "Login Error: Unable to verify email address!");
        }
        else{
            //yay!!
            req.flash("warning", "Login Error: Unable to verify email address!");
        }
        res.redirect('/'); //show all
        return;

    });

})

// 2b. submit register request  via POST
app.post('/register', function (req, res) {
    console.log(Array(50).join("*") + "\nPOST", "/register", "Register via post:.. " + format_date(new Date()));
    console.log(req.body);

    var p = new register_model({
        // name: req.body.name,
        // username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dateofbirth: req.body.dateofbirth,
        password1: req.body.password1,
        password2: req.body.password2,
    });

    var error = p.validateSync()
    if (error) {
        console.log(Array(50).join("*"));
        for (var e in error.errors){
            console.log(error.errors[e].path, ":", error.errors[e].name, " = ", error.errors[e].message);
            req.flash("danger", "Registration Error: " + error.errors[e].message.replace("Path ", ""));
        }
        res.redirect('/'); //show all
        return;
    }

    console.log("Testing email address ... 1");
    login_model.findOne({ email: req.body.email }, function (err, email_test) {
        console.log("Testing email address ... 2");
        if (email_test) {
            console.log("Testing email address ... 3");
            console.log(email_test);
            console.log("Testing email address ... 4");
            //womp womp, already exists ... = sad face
            req.flash("warning", "Registraiton Error: Email address already in use!");
            res.redirect('/'); //show all
            return;
        }
        else if (err){
            console.log("Testing email address ... 5");
            console.log(err);
            console.log("Testing email address ... 6");
            //womp womp, some error = sad face
            req.flash("danger", "Registration Error: Unable to verify email address!");
            res.redirect('/'); //show all
            return;
        }
        else{
            //yay!!
            console.log("Testing email address complete ==> OK");

            bcrypt.hash(req.body.password1, 10)
            .then(hashed_password => {
                // hash = hashed_password;         
                console.log("bcrypt.hash:",  req.body.password1, hashed_password);

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password1, salt);
                console.log("bcrypt.hashSync:",  req.body.password1, hash);
    
                login_model.create({ 
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dateofbirth: req.body.dateofbirth,
                    hashpw: hashed_password,
                }, function (err, new_login) {
                    if (err){
                        var out_err = err;
                        console.log(Array(50).join("*"));
                        console.log(err);
                        for (var e in err.errors){
                            console.log(err.errors[e].path, ":", err.errors[e].name, " = ", err.errors[e].message);
                        }
                        console.log("SHOW ERRORS TO USER HERE ++++++++++++++++++===========================================================================");
                        res.redirect('/'); //show all
                        return;
                    } 
                    else {
                        // saved!
                        console.log("Registration Created!");
                        req.flash("success", "Welcome!  Use <" + req.body.email + "> to login to your account.");
                        res.redirect('/'); //show all
                        return;
                    }
                });
            })

        }
    });

})




// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nLOGIN+REGISTRATION Node Server Listening on Port 8000 .. " + format_date(new Date()));
});


