const cake = require('../controllers/cakes');

module.exports = api => {
	api.route('/api/cakes').get(cake.getCakes);             //list
	api.route('/api/cakes').post(cake.createCake);          //C
	api.route('/api/cakes/:id').get(cake.getCake);          //R
	api.route('/api/cakes/:id').put(cake.addRating);        //U rating
	api.route('/api/cakes/:id').delete(cake.deleteCake);    //D
};
