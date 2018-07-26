const restaurants = require('../controllers/rest');
const path = require('path');
const utils = require('../config/utils');


module.exports = api => {

    api.use(function (req, res, next) {
        console.log(Array(50).join("*") + "\n Incoming Request: ", req.method, ": ", req.originalUrl, " " + utils.formatDate(new Date()));
        next();
    });

	api.route('/api/restaurants').get(restaurants.getList);                 //list
	api.route('/api/restaurants/new').post(restaurants.createOne);          //C
	api.route('/api/restaurants/:id/food').post(restaurants.addFood);       //U review
	api.route('/api/restaurants/:id/review').post(restaurants.addReview);   //U food
	api.route('/api/restaurants/:id').get(restaurants.getOne);              //R 
	api.route('/api/restaurants/:id').delete(restaurants.deleteOne);        //D
    
    api.all("*", (req, res, next) => {
        console.log(" ---- INVOKING ANGULAR FOR ROUTING ----");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};
