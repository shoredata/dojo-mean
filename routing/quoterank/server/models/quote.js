// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema(
    {
        votes:  {
            type: Number,
            default: 0,
        },
        quote: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Quote."],
            maxlength: [128, "Please enter no more than 128 characters for the Quote."],
            trim: true,
            default: '',
            required: [true, "Please enter a Quote."]
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'quotes' },
);

module.exports = QuoteSchema;
module.exports = exports = mongoose.model('Quote', QuoteSchema);
