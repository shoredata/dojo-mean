// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Name."],
            required: [true, "Please enter a Name."],
        },
        rating: {
            type: String,
            required: [true, "Please enter a Rating."],
        },
        description: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Description."],
            required: [true, "Please enter a Description."],
        },
        price: {
            type: String,
            required: [true, "Please enter a Price."],
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'foods' },
);

module.exports = FoodSchema;
module.exports = exports = mongoose.model('Food', FoodSchema);
