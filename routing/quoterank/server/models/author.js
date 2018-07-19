// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
    {
        quotes: [],
        name: {
            type: String,
            default: '',
            required: [true, "Please enter a Name."]
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'authors' },
);

module.exports = AuthorSchema;
module.exports = exports = mongoose.model('Author', AuthorSchema);
