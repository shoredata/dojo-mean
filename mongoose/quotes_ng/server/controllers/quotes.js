// All necessary requires, such as the Quote model.
const mongoose = require('mongoose'), 
    QuoteModel = mongoose.model('QuoteModel')

module.exports = {

    index: function(req, res) {
        if (req.session.errors==null) { 
            req.session.errors = [];
        } 
        var all_errors = req.session.errors;
        res.render("index", { errors: all_errors });
    },

    list: function(req, res) {
        req.session.errors = [];
        req.session.errors.length = 0;
        var currentQuotes = mongoose.model('QuoteModel');
        currentQuotes.find({}).sort('-created_at').exec(function (err, all_quotes) {
            if (err) {
                console.log("There was an error listing the quotes ... showing error to user");
                req.session.errors.length = 0;
                req.session.errors = err;
                res.redirect('/');
            }
            else {
                res.render('quotes', { quotes: all_quotes });
            }
        });
    },

    create: function(req, res) {
        req.session.errors = [];
        req.session.errors.length = 0;
        if ('list' in req.body) {
            console.log("POST: Requesting List of quotes");
            res.redirect('/quotes'); //show all quotes
        }
        else {
            console.log("POST: inserting a quote", req.body);
            console.log("  Name: ", req.body.name);
            console.log("  Quote: ", req.body.quote);

            QuoteModel.create({ 
                name: req.body.name,
                quote: req.body.quote
            }, function (err, new_quote_model) {
                if (err){
                    console.log("there was an error, we will let the user know via session :(");
                    req.session.errors.length = 0;
                    req.session.errors = err;
                    res.redirect('/'); //show errors
                } 
                else {
                    // saved!
                    console.log("Quote Saved!");
                    res.redirect('/quotes'); //show all quotes
                }
            });
        }
    },

    destroy: function(req, res) {
    	// code...
        console.log("-- NEEDS TO BE IMPLEMENTED --");
    }
};
