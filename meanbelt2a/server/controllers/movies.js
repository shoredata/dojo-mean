//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const Review = mongoose.model('Review');
const utils = require('../config/utils');
const assert = require('assert')

module.exports = {

    //list
    getMovies: function (req, res) {
        console.log(" getMovies: "); //
        Movie.find({}, function(err,data) {
            if(err)
                return res.send(err);
            return res.json(data);
        });
    },


    // C
    createOneMovie: function(req, res) {
        console.log(" createOneMovie: ", req.body); // ok, need new error parser
        Movie.create(req.body)
        .then(data => { console.log(" createOneMovie => data: ", data); return res.json(data); } )
        .catch(errs =>  { console.log(" createOneMovie => errs: ", errs); return res.status(500).json(errs); } )
    },


    // R
    getMovie: function (req, res) {
        console.log(" getMovie: ", req.params); //
        Movie.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                // console.log("There was an error getting: \n", err)
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },


    // D
    deleteMovie: function (req, res) {
        console.log(" deleteMovie: ", req.params); //
        Movie.findOneAndRemove({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json("All clear!")
        })
    },


    // U addReview (creates a new object so need route/method
    addReview: function (req, res) {
        console.log(" addReview: ", req.params, req.body); //
        Movie.findOne({_id: req.params.id}, (err, movie) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (movie) {
                console.log("Adding Review to Movie: ", movie.id);

                const data = Object.assign(req.body, { movie: req.params }) || {};                

                let r = {
                    review: data.review,
                    rating: data.rating,
                    reviewer: data.reviewer
                };

                Review.create(req.body)
                .then(newReview => { 
                    console.log(" Review.create => data: ", movie); 

                    let srating = req.body.rating;

                    if (movie.reviews.length>0)
                    {
                        let sum = parseFloat(req.body.rating);
                        console.log("sum", sum);
                        let count = 1;
                        for (var idx = 0; idx < movie.reviews.length; idx++) {
                            console.log("AA:" , movie.reviews[idx].rating);
                            sum += movie.reviews[idx].rating;
                            count++;
                            console.log("BB: sum, count", sum, count);
                        }
                        let rating = sum/count;
                        console.log("rating", rating);
                        srating = rating.toFixed(1).toString();
                    }
                    console.log("srating", srating);
                    movie.rating = srating;
                    movie.markModified('rating');     // ***************************
                    movie.reviews.push(newReview);
                    movie.markModified('reviews');    // ***************************

                    movie.save(function(err) {

                        Movie.findOne({_id: req.params.id}, (err, confirm_review) => {
                            if (confirm_review) {
                                console.log("Review added!");
                                return res.json(confirm_review);
                            }
                            else{
                                return res.status(500).json(err);                                
                            }
                        });
                    });

                } )
                .catch(errs =>  { console.log(" Review.create => errs: ", errs); return res.status(500).json(errs); } )
            }
            else 
            {
                console.log("Unknown, both err & movie == nothing .. check id");
                return res.status(500);
            }
        })
    },


    // D delete review
    deleteReview: function (req, res) {
        console.log(" deleteReview: ", req.params, req.body); //
        Movie.findOne({_id: req.params.id}, (err, movie) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (movie) {
                console.log("Deleting Review from Movie: ", movie.id);

                let srating = "0";
                let sum = 0;
                let count = 0;
                let ldelete = -1;

                for (var idx = 0; idx< movie.reviews.length; idx++) {
                    console.log("AAA: ", idx, movie.reviews[idx], req.params.rid);
                    if (movie.reviews[idx]._id == req.params.rid) {
                        console.log("DELETING: ", idx, movie.reviews[idx], req.params.rid);
                        ldelete = idx;
                    }
                    else {
                        sum += movie.reviews[idx].rating;
                        count++;
                    }
                }

                if (ldelete>-1) {
                    console.log("DO IT: ", idx, movie.reviews[idx], req.params.rid);
                    movie.reviews.slice(ldelete, 1);
                }

                if (count>0) {
                    let rating = sum/count;
                    console.log("rating", rating);
                    srating = rating.toFixed(1).toString();
                }

                console.log("srating", srating);
                movie.rating = srating;
                movie.markModified('rating');     // ***************************

                // movie.reviews.pull(movie.reviews[ldelete]);
                movie.markModified('reviews');    // ***************************




                movie.markModified('reviews');    // ***************************
                movie.save(function(err) {
                    if(err) {
                        return res.status(401).json(err);
                    }
                    return res.json("All clear!");
                });
            }
            else 
            {
                console.log("Unknown, both err & movie == nothing .. check id");
                return res.status(500);
            }
        })
    },




}


