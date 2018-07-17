// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema(
    {
        ratings: [],
        name: {
            type: String,
            default: '',
            required: [true, "Please enter a Name."]
        },
        url: {
            type: String,
            default: '',
            required: [true, "Please enter a URL."]
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'cakes' },
);

module.exports = CakeSchema;
module.exports = exports = mongoose.model('Cake', CakeSchema);
