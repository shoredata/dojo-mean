// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Movie Title."],
            required: [true, "Please enter a Movie Title."],
        },
        rating: {
            type: String,
            default: "0",
        },
        reviews: [],
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'movies' },
);

module.exports = MovieSchema;
module.exports = exports = mongoose.model('Movie', MovieSchema);
