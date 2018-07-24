const pet = require('../controllers/pets');
const path = require('path');
const utils = require('../config/utils');


module.exports = api => {

    api.use(function (req, res, next) {
        console.log(Array(50).join("*") + "\n Incoming Request: ", req.method, req.originalUrl, " " + utils.formatDate(new Date()));
        next();
    });

	api.route('/api/pets').get(pet.getPets);            //list
	api.route('/api/pets').post(pet.createPet);         //C 
	api.route('/api/pets/new').post(pet.createAPet);         //C v2
	api.route('/api/pets/:id').get(pet.getPet);         //R 
	api.route('/api/pets/:id').patch(pet.updatePet);    //U
	api.route('/api/pets/:id').post(pet.updateAPet);        //U v2
	api.route('/api/pets/:id').delete(pet.deletePet);   //D
	api.route('/api/pets/:id').put(pet.likePet);        //U like
    
    api.all("*", (req, res, next) => {
        console.log(" ---- INVOKING ANGULAR FOR ROUTING ----");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};
