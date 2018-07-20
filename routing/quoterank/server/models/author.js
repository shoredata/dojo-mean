// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
    {
        quotes: [],
        name: {
            type: String,
            minlength: [5, "Please enter at least 5 characters for the Name."],
            maxlength: [64, "Please enter no more than 64 characters for the Name."],
            trim: true,
            default: '',
            required: [true, "Please enter an Author Name."]
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'authors' },
);

module.exports = AuthorSchema;
module.exports = exports = mongoose.model('Author', AuthorSchema);
