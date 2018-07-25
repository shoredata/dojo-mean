// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [2, "Please enter at least 2 characters for the Player Name."],
            required: [true, "Please enter a Player Name."],
        },
        position: {
            type: String,
            default: '',
        },
        game1: {
            type: Number,
            default: 0,
            required: [true, "Please specify the Player Choice for Game 1."],
        },
        game2: {
            type: Number,
            default: 0,
            required: [true, "Please specify the Player Choice for Game 2."],
        },
        game3: {
            type: Number,
            default: 0,
            required: [true, "Please specify the Player Choice for Game 3."],
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'players' },
);

module.exports = PlayerSchema;
module.exports = exports = mongoose.model('Player', PlayerSchema);
