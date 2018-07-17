const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/cakes_dojo";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
console.log("Connecting to " + mongoDB);
const models = require('../models'); //invokes /server/models/index.js

