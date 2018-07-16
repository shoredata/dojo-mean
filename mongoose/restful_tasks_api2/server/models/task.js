// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/

// import npm modules
// import timestamps from 'mongoose-timestamp';

// const mongoose = require('mongoose')
const mongoose = require('mongoose');


// build task schema
const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
            required: true,
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'tasks' },
);

module.exports = TaskSchema;

// pre-save hook
TaskSchema.pre('save', function(next) {
    if (!this.isNew) {
        console.log("TaskSchema, pre-save, not new");
    }
    else {
        console.log("TaskSchema, pre-save, new");
    }
    next();
});

// pre-save hook
TaskSchema.pre('findOneAndUpdate', function(next) {
    console.log("TaskSchema, pre-findOneAndUpdate");
    return next();
});


module.exports = exports = mongoose.model('Task', TaskSchema); // export model for use