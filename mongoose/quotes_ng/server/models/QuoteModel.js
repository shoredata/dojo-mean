const mongoose = require('mongoose')

const QuoteModelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, min: 5, max: 100 },
    quote: { type: String, required: true, trim: true, min: 5, max: 1024 },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, required: true, default: Date.now }
});

var QuoteModel = module.exports = mongoose.model('QuoteModel', QuoteModelSchema);

// these are not sued but are here for reference

module.exports.getQuoteById = function(id, callback) {
    QuoteModel.findById(id, callback);
}

module.exports.getQuoteByPosterName = function(poster, callback) {
    var query = {poster: poster};
    QuoteModel.findOne(query, callback);
}
  