const movies = require('../controllers/movies');
const path = require('path');
const utils = require('../config/utils');


module.exports = api => {

    api.use(function (req, res, next) {
        console.log(Array(50).join("*") + "\n Incoming Request: ", req.method, ": ", req.originalUrl, " " + utils.formatDate(new Date()));
        next();
    });

	api.route('/api/movies').get(movies.getMovies);             //list
	api.route('/api/movies/new').post(movies.createOneMovie);   //C v2
	api.route('/api/movies/:id/reviews/:rid').delete(movies.deleteReview);    //D
	api.route('/api/movies/:id').get(movies.getMovie);          //R 
	api.route('/api/movies/:id').post(movies.addReview);        //U review
	api.route('/api/movies/:id').delete(movies.deleteMovie);    //D
    
    api.all("*", (req, res, next) => {
        console.log(" ---- INVOKING ANGULAR FOR ROUTING ----");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};
