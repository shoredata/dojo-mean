const products = require('../controllers/products');
const path = require('path');
const utils = require('../config/utils');


module.exports = api => {

    api.use(function (req, res, next) {
        console.log(Array(50).join("*") + "\n Incoming Request: ", req.method, ": ", req.originalUrl, " " + utils.formatDate(new Date()));
        next();
    });

	api.route('/api/products').get(products.getList);          //list
	api.route('/api/products/new').post(products.createOne);   //C
	api.route('/api/products/:id').get(products.getOne);       //R 
	api.route('/api/products/:id').post(products.updateOne);   //U 
	api.route('/api/products/:id').delete(products.deleteOne); //D
    
    api.all("*", (req, res, next) => {
        console.log(" ---- INVOKING ANGULAR FOR ROUTING ----");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};
