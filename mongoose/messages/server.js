// Whole-script strict mode syntax
'use strict';

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/msg__node_dojo';

var Schema = mongoose.Schema;
var message_schema = new Schema();
message_schema.add({
    // Array of Messages
    comments: [{ poster: String, comment: String }],
    message: { type: String, required: true, trim: true }, 
    poster: { type: String, required: true, trim: true },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, required: true, default: Date.now }
  });

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// also here: http://mongoosejs.com/docs/guide.html
var message_model = mongoose.model('message_model', message_schema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// HELPERS -----------------------------------------------------

function format_date(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

function log_object_by_id(object_id){
    message_model.findById(object_id.toObjectId(), function (err, this_object) {
        if (err) {
            handleError(err);
        }
        else {
            console.log(this_object);
        }
    });
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

// 1. list all messages = index
app.get('/', function(req, res) {
    console.log("GET", "/", "index.ejs", "List all messages");
    message_model.find({}).sort('-created_at').exec(function (err, all_messages) {
        if (err) {
            handleError(err);
            res.send(500, { message: 'Error building list of all Messages', error: err });            
        }
        else {
            for (var m in all_messages) {
                if (all_messages[m].comments.length>0) {
                    console.log("***********************************************************************************************************");
                    console.log(all_messages[m].poster, " has comments:");
                    for (var idx=0; idx< all_messages[m].comments.length; idx++) {
                        console.log("------\n", all_messages[m].comments[idx]);
                        console.log(all_messages[m].comments[idx].poster);
                        console.log(all_messages[m].comments[idx].comment);
                    }
                }
            }
            res.render('index', { all_messages: all_messages });
        }
    });
})

// 2. submit new message/comment via POST
app.post('/messages/insert', function (req, res) {
    console.log("POST", "/messages/insert", "Insert new message: ");
    console.log(req.body);
    console.log("  Message: ", req.body.message);
    console.log("  Poster: ", req.body.poster);
    console.log("  ParentID: ", req.body.parent_id);

    if (req.body.parent_id){
        // inserting a child = comment
        message_model.findById(req.body.parent_id.toObjectId(), function (err, this_parent) {
            if (err) {
                handleError(err);
                res.send(500, { message: "Error finding parent of the new Comment", error: err });            
            }
            else {
                this_parent.comments.push({ 
                    comment: req.body.message,
                    poster: req.body.poster
                });
                this_parent.save(function (err, message) {
                    if (err) {
                        handleError(err);
                        res.send(500, { message: "Error finding parent of the new Comment", error: err });            
                    }
                    else {                            
                        var comments_count = message.comments.length;
                        console.log("Parent Saved!");
                        log_object_by_id(req.body.parent_id)
                        res.redirect('/'); //show all                        
                    }
                });
            }
        });

    }
    else{
        // inserting a new message
        message_model.create({ 
            message: req.body.message,
            poster: req.body.poster
        }, function (err, new_message) {
            if (err){
                handleError(err);
                res.send(500, { message: 'Error creating Message', error: err });            
            } 
            else {
                // saved!
                console.log("Message Created!");
                res.redirect('/'); //show all
            }
        });
    }
})



// 7a. POST Should delete the x from the database by ID (POST??? --> nope get)
app.get('/messages/destroy/:msgid', function(req, res) {
    console.log("GET", "/messages/destroy/:", req.params.msgid);

    message_model.remove({_id: req.params.msgid.toString().toObjectId()}, (err) => {
        if (err) {
            res.send(500, { error: 'Error deleting message by id!' });            
        }
        console.log("Message Deleted!");
        res.redirect('/'); //show all messages
    });
})



// LISTENER -----------------------------------------------------

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nMESSAGES Node Server Listening on Port 8000 .. " + format_date(new Date()));
});


