const author = require('../controllers/authors');
const path = require('path');

module.exports = api => {

    api.use(function (req, res, next) {
        console.log("***** Incoming Request: ", req.method, req.originalUrl)
        // console.log('Request URL:', req.originalUrl)
        next()
    // }, function (req, res, next) {
    //     console.log('Request Type:', req.method)
    //     next()
    })

	api.route('/api/authors').get(author.getAuthors);           //list
	api.route('/api/authors').post(author.createAuthor);        //C author
	api.route('/api/authors/:id').get(author.getAuthor);        //R author, includes list of author.quotes
	api.route('/api/authors/:id').put(author.updateAuthor);     //U author (name)
	api.route('/api/authors/:id').delete(author.deleteAuthor);  //D author
	api.route('/api/authors/:id/quote').post(author.addQuote);  //C author[quote]
	api.route('/api/authors/:id/quote/:qid').put(author.decVote);     //U downvote quote
	api.route('/api/authors/:id/quote/:qid').post(author.incVote);      //U upvote quote (no body)
	api.route('/api/authors/:id/quote/:qid').delete(author.desQuote);   //D quote ... delQuote
    
    api.all("*", (req,res,next) => {
        console.log("*** INVOKING ANGULAR FOR ROUTING ***");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};

