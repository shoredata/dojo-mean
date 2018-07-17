const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const utils = require('../config/utils');

module.exports = {

    // list
    getRatings: function (req, res) {
        console.log(Array(50).join("*") + "\ngetRatings: ", utils.formatDate(new Date())); // ok
        Rating.find({}, (err, ratings) => {
            if(err){
                return res.status(401).json(err);
            }
            return res.json(ratings);
        })
    },

    // C
    createRating: function (req, res) {
        console.log(Array(50).join("*") + "\ncreateRating: ", req.body, "\n" + utils.formatDate(new Date())); // ok
        var newRating = new Rating({rating: req.body.rating, comment: req.body.comment});
        newRating.save((err) => {
            if(err){
                console.log("There was an error in saving your new rating.")
                return res.status(500).json(err);
            }
        });
        return res.json("All clear!")
    },

    // R
    getRating: function (req, res) {
        console.log(Array(50).join("*") + "\ngetRating: ", req.params, "\n" + utils.formatDate(new Date())); // ok
        Rating.findOne({_id: req.params.id}, (err, rating) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json(rating);
        })
    },


}
