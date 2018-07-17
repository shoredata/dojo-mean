const ratings = require('../controllers/ratings');
const cakes = require('../controllers/cakes');
const path = require('path');

module.exports = api => {

    console.log("Parsing routes");

    api.route('/api/cakes').get(cakes.getCakes);        //list
    api.route('/api/cakes').post(cakes.createCake);     //C
    api.route('/api/cakes/:id').get(cakes.getCake);     //R
    // api.route('/api/cakes/:id').put(cakes);          //U
    api.route('/api/cakes/:id').put(cakes.addRating);   //U add rating
    // api.route('/api/cakes/:id').delete(cakes);       //D

    api.route('/api/ratings').get(ratings.getRatings);      //list
    api.route('/api/ratings').post(ratings.createRating);   //C
    api.route('/api/ratings/:id').get(ratings.getRating);   //R
    
};

