// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: [4, "Please enter at least 4 characters for the Title."],
            required: [true, "Please enter a Title."],
        },
        price: {
            type: String,
            required: [true, "Please enter a Price."],
        },
        image: {
            type: String,
            default: '',
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'products' },
);

module.exports = ProductSchema;
module.exports = exports = mongoose.model('Product', ProductSchema);
