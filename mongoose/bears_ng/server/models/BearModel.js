const mongoose = require('mongoose')

var BearModelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 100 },
    sex: { type: String, required: true, enum: ["male", "female", "none"] },
    markings: { type : Array , "default": [] },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, required: true, default: Date.now }
});

var BearModel = module.exports = mongoose.model('BearModel', BearModelSchema);
