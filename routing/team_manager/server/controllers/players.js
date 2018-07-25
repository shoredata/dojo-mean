'use strict';

//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Player = mongoose.model('Player');
const utils = require('../config/utils');
const assert = require('assert')

module.exports = {

    //list
    getPlayers: function (req, res) {
        console.log(" getPlayers: "); //
        Player.find({}, function(err,data) {
            if(err)
                return res.send(err);
            return res.json(data);
        });
    },


    // C
    createPlayer: function(req, res) {
        console.log(" createPlayer: ", req.body); 
        Player.create(req.body)
        .then(data => { console.log(" createPlayer => data: ", data); return res.json(data); } )
        .catch(errs =>  { console.log(" createPlayer => errs: ", errs); return res.status(500).json(errs); } )
    },


    // R
    getPlayer: function (req, res) {
        console.log(" getPlayer: ", req.params); //
        Player.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },


    // D
    deletePlayer: function (req, res) {
        console.log(" deletePlayer: ", req.params); //
        Player.findOneAndRemove({_id: req.params.id}, (err, data) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json("All clear!")
        })
    },


    // game status
    updateGame: function (req, res) {
        console.log(" updateGame: ", req.params, req.body); 
        const data = Object.assign(req.body, { player: req.params }) || {};
    	Player.findByIdAndUpdate({ _id: req.params.id }, data)
		.then(player => {
			if (!player) {
				return res.sendStatus(404);
			}
			// console.log(author);
			return res.json(player);
		})
		.catch(err => {
            // console.log("There was an error updating: \n", err)   ... look at err.errors!!!
            return res.status(401).json(err);
		});
    },





}


