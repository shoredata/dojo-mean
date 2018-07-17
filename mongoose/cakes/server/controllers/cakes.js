//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Cake = mongoose.model('Cake');
const Rating = mongoose.model('Rating');
const utils = require('../config/utils');

module.exports = {

    //list
    getCakes: function (req, res) {
        console.log(Array(50).join("*") + "\ngetCakes: ", utils.formatDate(new Date())); // ok
        Cake.find({}, (err, ratings) => {
            if(err){
                return res.status(401).json(err);
            }
            return res.json(ratings);
        })
    },

    // C
    createCake: function (req, res) {
        console.log(Array(50).join("*") + "\ncreateCake: ", req.body, "\n" + utils.formatDate(new Date())); // ok
        var newCake = new Cake({name: req.body.name, url: req.body.url});
        newCake.save((err) => {
            if(err){
                console.log("There was an error in saving your new cake.\n", err)
                return res.status(500).json(err);
            }
        });
        return res.json("All clear!")
    },

    // R
    getCake: function (req, res) {
        console.log(Array(50).join("*") + "\ngetCake: ", req.params, "\n" + utils.formatDate(new Date())); // ok
        Cake.findOne({_id: req.params.id}, (err, cake) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json(cake);
        })
    },


    // U for rating
    addRating: function (req, res) {
        console.log(Array(50).join("*") + "\naddRating: ", req.params, req.body, "\n" + utils.formatDate(new Date())); // ok
        Cake.findOne({_id: req.params.id}, (err, cake) => {
            if(err) {
                return res.status(401).json(err);
            }
            var newRating = new Rating({ rating: req.body.rating, comment: req.body.comment });
            newRating.save(function(err) {
                cake.ratings.push(newRating);
                cake.save(function(err) {
                    // todo
                    console.log("Are we done yet??");
                });
            });
            return res.json(cake);
        })
    },

}


