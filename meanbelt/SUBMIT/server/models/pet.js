// reference:
// https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Pet Name."],
            required: [true, "Please enter a Pet Name."],
            unique: [true, "That Pet Name already exists, please enter another."]
        },
        type: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Pet Type."],
            required: [true, "Please enter a Pet Type."],
        },
        description: {
            type: String,
            minlength: [3, "Please enter at least 3 characters for the Pet Description."],
            required: [true, "Please enter a Pet Description."],
        },
        skill1: {
            type: String,
            default: '',
        },
        skill2: {
            type: String,
            default: '',
        },
        skill3: {
            type: String,
            default: '',
        },
        likes: {
            type: Number,
            default: 0,
        },
        updated_at: { type: Date, default: Date.now },
        created_at: { type: Date, required: true, default: Date.now }
        },
    { collection: 'pets' },
);
PetSchema.plugin(uniqueValidator);

module.exports = PetSchema;
module.exports = exports = mongoose.model('Pet', PetSchema);
