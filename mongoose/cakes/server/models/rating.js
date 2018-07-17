// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            default: 0,
            required: [true, "Please enter a Rating."]
        },
        comment: {
            type: String,
            default: '',
            required: [true, "Please enter a Comment."]
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'ratings' },
);

module.exports = RatingSchema;
module.exports = exports = mongoose.model('Rating', RatingSchema);
