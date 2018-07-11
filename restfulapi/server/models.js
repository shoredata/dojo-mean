

const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean
}, {timestamps: true});

mongoose.connect("mongodb://localhost:27017/rtapi", {useNewUrlParser: true}, (errs)=>console.log(errs));
const Tasks = mongoose.model('task', TaskSchema);

module.exports = {Tasks};