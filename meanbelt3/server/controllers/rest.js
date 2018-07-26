'use strict';

//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Review = mongoose.model('Review');
const utils = require('../config/utils');
const assert = require('assert')

module.exports = {

    //list
    getList: function (req, res) {
        console.log(" getList: "); //
        Restaurant.find({}, function(err,data) {
            if(err)
                return res.status(400).json(err); //bad request
            return res.status(200).json(data);    //ok
        });
    },


    // C
    createOne: function(req, res) {
        console.log(" createOne: ", req.body); 
        Restaurant.create(req.body)
        .then(data => { console.log(" createOne => data: ", data); return res.status(201).json(data); } )
        .catch(errs =>  { console.log(" createOne => errs: ", errs); return res.status(500).json(errs); } )
    },


    // R
    getOne: function (req, res) {
        console.log(" getOne: ", req.params); //
        Restaurant.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.status(200).json(data);
        })
    },


    // D
    deleteOne: function (req, res) {
        console.log(" deleteOne: ", req.params); //
        Restaurant.findOneAndRemove({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.status(200).json("All clear!")
        })
    },


    // U addReview (creates a new object so need route/method
    addReview: function (req, res) {
        console.log(" addReview: ", req.params, req.body); //
        Restaurant.findOne({_id: req.params.id}, (err, rest) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (rest) {
                // console.log("Adding Review to rest: ", rest.id);

                // const data = Object.assign(req.body, { rest: req.params }) || {};                

                // let r = {
                //     review: data.review,
                //     rating: data.rating,
                //     name: data.name,
                // };

                Review.create(req.body)
                .then(newReview => { 
                    // console.log(" Review.create => data: ", rest); 

                    rest.reviews.push(newReview);
                    rest.markModified('reviews');    // ***************************

                    rest.save(function(err) {

                        Restaurant.findOne({_id: req.params.id}, (err, confirm_review) => {
                            if (confirm_review) {
                                // console.log("Review added!");
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
                console.log("Unknown, both err & rest == nothing .. check id");
                return res.status(500);
            }
        })
    },


    // U
    updateOne: function (req, res) {
        console.log(" updateOne: ", req.params, req.body); //
        // console.log("AAA",id);
        Restaurant.findById(mongoose.Types.ObjectId(req.params.id))
            .then(data => {
                Restaurant.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, {runValidators: true, context: 'query' })
                    .then(data => { console.log(" updateOne => data: ", data); return res.status(201).json(data); } )
                    .catch(errs =>  { console.log(" updateOne => errs: ", errs); return res.status(500).json(errs); } )
            });
    }



}


