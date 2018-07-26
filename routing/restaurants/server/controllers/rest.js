'use strict';

//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Review = mongoose.model('Review');
const Food = mongoose.model('Food');
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


    // U 
    addFood: function (req, res) {
        console.log(" addFood: ", req.params, req.body); //
        Restaurant.findOne({_id: req.params.id}, (err, rest) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (rest) {
                // console.log("Adding Food to rest: ", rest.id);

                // const data = Object.assign(req.body, { rest: req.params }) || {};                

                // let r = {
                //     description: data.description,
                //     rating: data.rating,
                //     name: data.name,
                //     price: data.price, 
                // };

                Food.create(req.body)
                .then(newFood => { 
                    // console.log(" Food.create => data: ", rest); 

                    rest.foods.push(newFood);
                    rest.markModified('foods');    // ***************************

                    rest.save(function(err) {

                        Restaurant.findOne({_id: req.params.id}, (err, confirm_food) => {
                            if (confirm_food) {
                                // console.log("Food added!");
                                return res.json(confirm_food);
                            }
                            else{
                                return res.status(500).json(err);                                
                            }
                        });
                    });

                } )
                .catch(errs =>  { console.log(" Food.create => errs: ", errs); return res.status(500).json(errs); } )
            }
            else 
            {
                console.log("Unknown, both err & rest == nothing .. check id");
                return res.status(500);
            }
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
                //     description: data.description,
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




}


