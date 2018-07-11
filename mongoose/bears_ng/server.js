// Whole-script strict mode syntax
'use strict';

// Assignment: Mongoose Dashboard
//
// This exercise will allow you to utilize all 4 CRUD methods with Mongoose. 
// In this exercise, you'll build an app which manages a pack of some kind of animal (think otter, rabbit, or owl). 
// You need to be able to add a new animal, update it, and delete it. 
//
// You should use the following routes to build this app:
// 1. GET '/' Displays all of the mongooses.
// 2. GET '/mongooses/:id' Displays information about one mongoose.
// 3. GET '/mongooses/new' Displays a form for making a new mongoose.
// 4. POST '/mongooses' Should be the action attribute for the form in the above route (GET '/mongooses/new').
// 5. GET '/mongooses/edit/:id' Should show a form to edit an existing mongoose.
// 6. POST '/mongooses/:id' Should be the action attribute for the form in the above route (GET '/mongooses/edit/:id').
// 7. POST '/mongooses/destroy/:id' Should delete the mongoose from the database by ID.
//
// Remember these routes are just examples, avoid using mongooses for your dashboard if you can!

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/bear_dojo';
var Schema = mongoose.Bear;
var BearModelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 100 },
    sex: { type: String, required: true, enum: ["male", "female", "none"] },
    markings: { type : Array , "default": [] },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, required: true, default: Date.now }
});
// Compile model from schema
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// also here: http://mongoosejs.com/docs/guide.html
var BearModel = mongoose.model('BearModel', BearModelSchema);
// var ObjectId = require('mongoose').Types.ObjectId; 

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

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

function handleError(error){
    // console.log("LOG=Error:", error.message);
    console.log("LOG=Error:", error);
}

// ROUTES  -----------------------------------------------------

// 1. get route '/' to render the list of all
app.get('/', function(req, res) {
    console.log("GET", "/");
    var currentBears = mongoose.model('BearModel', BearModelSchema);
    currentBears.find({}).sort('-created_at').exec(function (err, all_bears) {
        if (err) {
            // handleError(err);
            res.send(500, { error: 'Error building list of all Bears!' });            
        }
        else {
            res.render('bears', { allBears: all_bears });
        }
    });
})


// 2. GET route '/bears/:id' Displays information for one
app.get('/bears/view/:bearid', function(req, res) {
    console.log("GET", "/bears/view/:", req.params);
    var currentBears = mongoose.model('BearModel', BearModelSchema);

    // Model.findById
    // Same as findOne, but receives a value to search a document by their _id
    // key. This value is subject to casting, so it can be a hex string or a proper ObjectId.
    // Model.findById(obj._id, function (err, doc){
    //   // doc is a Document
    // });
    // var bearid = req.params.bearid;
    // var query = { _id: req.params.bearid.toString().toObjectId() };

    currentBears.findById(req.params.bearid.toString().toObjectId(), function (err, thisBear) {
        if (err) {
            // handleError(err);
            res.send(500, { error: 'Error building list of one Bear by id!' });            
        }
        else {
            console.log(thisBear);
            res.render('bear', { thisBear: thisBear });
        }
    });
})

// 3. GET '/bears/new' Displays a form for making a new bear
app.get('/bears/new', function(req, res) {
    console.log("GET", "/bears/new");
    res.render('bear_new');
})

// 4. POST '/bears' Should be the action attribute for the form in the above route (GET '/bears/new').
app.post('/bears/insert', function (req, res) {
    console.log("POST: /bears/insert ..  inserting a bear", req.body);
    // console.log("  Name: ", req.body.name);
    // console.log("  Age: ", req.body.age);
    // console.log("  Markings: ", req.body.markings);
    // console.log("  Sex: ", req.body.sex);

    BearModel.create({ 
        name: req.body.name,
        sex: req.body.sex,
        age: req.body.age,
        markings: req.body.markings
    }, function (err, new_bear_model) {
        if (err){
            handleError(err);
            res.send(500, { error: err });            
        } 
        else {
            // saved!
            console.log("Bear Saved!");
            res.redirect('/'); //show all bears
        }
    });
})

// 5. GET '/mongooses/edit/:id' Should show a form to edit an existing mongoose.
app.get('/bears/edit/:bearid', function(req, res) {
    console.log("GET", "/bears/edit/:", req.params);
    var currentBears = mongoose.model('BearModel', BearModelSchema);

    // Model.findById
    // Same as findOne, but receives a value to search a document by their _id
    // key. This value is subject to casting, so it can be a hex string or a proper ObjectId.
    // Model.findById(obj._id, function (err, doc){
    //   // doc is a Document
    // });
    // var bearid = req.params.bearid;
    // var query = { _id: req.params.bearid.toString().toObjectId() };

    currentBears.findById(req.params.bearid.toString().toObjectId(), function (err, thisBear) {
        if (err) {
            // handleError(err);
            res.send(500, { error: 'Error building list of one Bear by id!' });            
        }
        else {
            console.log(thisBear);
            res.render('bear_edit', { thisBear: thisBear });
        }
    });
})


// 6. POST '/mongooses/update:id' Should be the action attribute for the form in the above route (GET '/mongooses/edit/:id').
app.post('/bears/update', function (req, res) {
    console.log("POST: /bears/update ..  updating a bear", req.body);
    // console.log("  Name: ", req.body.name);
    // console.log("  _ID: ", req.body._id);
    // console.log("  Age: ", req.body.age);
    // console.log("  Markings: ", req.body.markings);
    // console.log("  Sex: ", req.body.sex);

    BearModel.findById(req.body._id.toString().toObjectId(), function(err, p) {
        if (!p) {
            return next(new Error('Could not Bear to update HAHAHAHAH'));
        }
        else {
            p.updated_at = new Date();
            p.name = req.body.name;
            p.age = req.body.age;
            p.markings = req.body.markings;
            p.sex = req.body.sex;
            p.save(function(err) {
                if (err) {
                    res.send(500, { error: 'Error updating bear by id!' });            
                }
                else {
                    console.log(p);
                    // res.render('bear_edit', { thisBear: thisBear });
                    res.redirect('/bears/view/' + req.body._id.toString()); //show this bear                
                }
            });
        }
    });
})

// 7. POST '/mongooses/destroy/:id' Should delete the mongoose from the database by ID.
app.get('/bears/destroy/:bearid', function(req, res) {
    console.log("GET", "/bears/destroy/:", req.params);
    console.log("GET", "/bears/destroy/:", req.params.bearid);

    // User.findOneAndRemove({_id: req.params.id}, (err) => {
    BearModel.remove({_id: req.params.bearid.toString().toObjectId()}, (err) => {
        if (err) {
            res.send(500, { error: 'Error deleting bear by id!' });            
        }
        console.log("Bear Deleted!");
        res.redirect('/'); //show all bears
    });
})
    





// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nQUOTES: Node.js Server Listening on Port 8000 .. " + formatDate(new Date()));
});


