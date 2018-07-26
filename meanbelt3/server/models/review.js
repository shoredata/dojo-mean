// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Name."],
            required: [true, "Please enter a Name."],
        },
        rating: {
            type: String,
            default: '0',
            required: [true, "Please enter a Rating."],
        },
        review: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Review."],
            required: [true, "Please enter a Review."],
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'reviews' },
);

module.exports = ReviewSchema;
module.exports = exports = mongoose.model('Review', ReviewSchema);
