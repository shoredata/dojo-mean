//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const Quote = mongoose.model('Quote');
const utils = require('../config/utils');


module.exports = {

    //list
    getAuthors: function (req, res) {
        console.log(Array(50).join("*") + "\n getAuthors: ", utils.formatDate(new Date())); //
        Author.find({}, (err, data) => {
            if(err){
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },

    // C author
    createAuthor: function (req, res) {
        console.log(Array(50).join("*") + "\n createAuthor: ", req.body, "\n " + utils.formatDate(new Date())); //
        var newAuthor = new Author({ name: req.body.name });
        newAuthor.save((err) => {
            if(err){
                // console.log("There was an error creating: \n", err)
                return res.status(500).json(err);
            }
            // return res.json(newCake);
        });
        return res.json("All clear!")
    },

    // R author
    getAuthor: function (req, res) {
        console.log(Array(50).join("*") + "\n getAuthor: ", req.params, "\n " + utils.formatDate(new Date())); //
        Author.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                // console.log("There was an error getting: \n", err)
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },

    // U author
    updateAuthor: function (req, res) {
        console.log(Array(50).join("*") + "\n updateAuthor: ", req.params, req.body, "\n " + utils.formatDate(new Date())); //
        const data = Object.assign(req.body, { author: req.params }) || {};
    	Author.findByIdAndUpdate({ _id: req.params.id }, data)
		.then(author => {
			if (!author) {
				return res.sendStatus(404);
			}
			// console.log(author);
			res.json(author);
		})
		.catch(err => {
            // console.log("There was an error updating: \n", err)   ... look at err.errors!!!
            return res.status(401).json(err);
		});
    },


    // U addQuote (creates a new object so need route/method
    addQuote: function (req, res) {
        console.log(Array(50).join("*") + "\n addQuote: ", req.params, req.body, "\n " + utils.formatDate(new Date())); //
        Author.findOne({_id: req.params.id}, (err, author) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (author) {
                console.log("Adding rating to Author: ", author.id);
                var newQuote = new Quote({ quote: req.body.quote, votes: 0 });
                newQuote.save(function(err) {
                    author.quotes.push(newQuote);
                    author.save(function(err) {
                        Author.findOne({_id: req.params.id}, (err, confirm_author) => {
                            if (confirm_author) {
                                console.log("Quote added!");
                                return res.json(confirm_author);
                            }
                        });
                    });
                });
                // return res.json(cake);
            }
            else 
            {
                console.log("Unknown, both err & author == nothing .. check id");
                return res.status(500);
            }
        })
    },


    // U quote up
    incVote: function (req, res) {
        console.log(Array(50).join("*") + "\n incVote: ", req.params, req.body, "\n " + utils.formatDate(new Date())); //
        Author.findOne({_id: req.params.id}, (err, author) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (author) {
                // console.log("Incrementing votes for Author, Quote: ", author.id, req.params.qid);
                for (var idx=0; idx<author.quotes.length; idx++) {
                    // console.log(idx, author.quotes[idx]);
                    if (author.quotes[idx]._id == req.params.qid) {
                        // console.log("Quote Found:", author.quotes[idx]);
                        author.quotes[idx].votes = author.quotes[idx].votes + 1;
                        author.markModified('quotes');  // ***************************
                        author.save();
                    }
                }
                console.log("Quote Updated!", author.quotes);
                return res.json(author);
            }
            else 
            {
                console.log("Unknown, both err & author == nothing .. check id");
                return res.status(500);
            }
        })
    },


    // U quote down
    decVote: function (req, res) {
        console.log(Array(50).join("*") + "\n decVote: ", req.params, req.body, "\n " + utils.formatDate(new Date())); //
        Author.findOne({_id: req.params.id}, (err, author) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (author) {
                // console.log("Decrementing votes for Author, Quote: ", author.id, req.params.qid);
                for (var idx=0; idx<author.quotes.length; idx++) {
                    // console.log(idx, author.quotes[idx]);
                    if (author.quotes[idx]._id==req.params.qid) {
                        // console.log("Quote Found:", author.quotes[idx]);
                        author.quotes[idx].votes = author.quotes[idx].votes - 1;
                        author.markModified('quotes');  // ***************************
                        author.save();
                    }
                }
                console.log("Quote Updated!", author.quotes);
                return res.json(author);
            }
            else 
            {
                console.log("Unknown, both err & author == nothing .. check id");
                return res.status(500);
            }
        })
    },


    //D quote, version 1 = quit workign for no reason :()
    destroyQuote: function(req, res) {
        console.log(Array(50).join("*") + "\n destroyQuote: ", req.params, "\n " + utils.formatDate(new Date())); //
        Author.findByIdAndUpdate(req.params.id, { $pull: { "quotes": { _id: req.params.qid } } }, { safe: true, upsert: true }, 
        function(err, author) {
            if(err) {
                return res.status(401).json(err);
            }
            else if (author) {
                console.log(author);
                return res.json(author);
            }
            else {
                console.log("Unknown, both err & author == nothing .. check ids");
                return res.status(500);
            }
        });
    },


    // // D quote v2
    // desQuote: function(req, res) {
    //     console.log(Array(50).join("*") + "\n desQuote: ", req.params, "\n " + utils.formatDate(new Date())); //
    //     Author.findOneAndUpdate( 
    //         { 'quotes._id' : req.params.qid },
    //         { $pull: { quotes: { _id: req.params.qid } } },
    //         { new: true },
    //         function(err, doc){ 
    //             if(err) {
    //                 return res.status(401).json(err);
    //             }
    //             return res.json("All clear!")
    //             }
    //     );    
    // },

    //D v3:
    // me.friends.remove(uid);
    // me.save(callback);    
    desQuote: function(req, res) {
        console.log(Array(50).join("*") + "\n desQuote3: ", req.params, "\n " + utils.formatDate(new Date())); //
        Author.findOne({_id: req.params.id}, (err, author) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (author) {
                // console.log("Decrementing votes for Author, Quote: ", author.id, req.params.qid);
                // author.quotes.remove(req.params.qid);
                for (var idx=0; idx<author.quotes.length; idx++) {
                    // console.log(idx, author.quotes[idx]);
                    if (author.quotes[idx]._id==req.params.qid) {
                        // console.log("Quote Found:", author.quotes[idx]);
                        // author.quotes.remove(req.params.qid);
                        author.quotes.splice(idx, 1);
                        author.markModified('quotes');  // ***************************
                        author.save();
                        console.log("Quote Removed..", idx);
                        break;
                    }
                }
                console.log("Quote Updated!", author.quotes);
                return res.json(author);
            }
            else 
            {
                console.log("Unknown, both err & author == nothing .. check id");
                return res.status(500);
            }
        })
    },



    // D author
    deleteAuthor: function (req, res) {
        console.log(Array(50).join("*") + "\n deleteAuthor: ", req.params, "\n " + utils.formatDate(new Date())); //
        Author.findOneAndRemove({_id: req.params.id}, (err, cake) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json("All clear!")
        })
    },


}


