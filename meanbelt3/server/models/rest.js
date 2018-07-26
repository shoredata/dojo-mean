// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
    {
        reviews: [],
        name: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Restaurant Name."],
            required: [true, "Please enter a Restaurant Name."],
            unique: [true, "That Restaurant Name already exists, please enter another."]
        },
        cuisine: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Cuisine."],
            required: [true, "Please enter a Cuisine."],
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'restaurants' },
);

module.exports = RestaurantSchema;
module.exports = exports = mongoose.model('Restaurant', RestaurantSchema);
