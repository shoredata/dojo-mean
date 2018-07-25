'use strict';

//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const utils = require('../config/utils');
const assert = require('assert')

module.exports = {

    //list
    getList: function (req, res) {
        console.log(" getList: "); //
        Product.find({}, function(err,data) {
            if(err)
                return res.send(err);
            return res.json(data);
        });
    },


    // C
    createOne: function(req, res) {
        console.log(" createOne: ", req.body); 
        Product.create(req.body)
        .then(data => { console.log(" createOne => data: ", data); return res.json(data); } )
        .catch(errs =>  { console.log(" createOne => errs: ", errs); return res.status(500).json(errs); } )
    },


    // R
    getOne: function (req, res) {
        console.log(" getOne: ", req.params); //
        Product.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },


    // D
    deleteOne: function (req, res) {
        console.log(" deleteOne: ", req.params); //
        Product.findOneAndRemove({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json("All clear!")
        })
    },


    // U 
    updateOne: function (req, res) {
        console.log(" updateOne: ", req.params, req.body); 
        const data = Object.assign(req.body, { product: req.params }) || {};
    	Product.findByIdAndUpdate({ _id: req.params.id }, data)
		.then(product => {
			if (!product) {
				return res.sendStatus(404);
			}
			return res.json(product);
		})
		.catch(err => {
            return res.status(401).json(err);
		});
    },





}


