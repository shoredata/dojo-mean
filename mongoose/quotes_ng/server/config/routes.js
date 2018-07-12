const mongoose = require('mongoose'), 
    quotes = require('../controllers/quotes')


module.exports = function(app) {

    // root route to render the index.ejs view
    app.get('/', function(req, res){
        quotes.index(req, res);
    })

    // get route for listing quotes
    app.get('/quotes', function(req, res){
        quotes.list(req, res);
    })

    // post route for adding a quote
    app.post('/quotes', function (req, res) {
        quotes.create(req, res);
    })

}  
