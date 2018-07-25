const players = require('../controllers/players');
const path = require('path');
const utils = require('../config/utils');


module.exports = api => {

    api.use(function (req, res, next) {
        console.log(Array(50).join("*") + "\n Incoming Request: ", req.method, ": ", req.originalUrl, " " + utils.formatDate(new Date()));
        next();
    });

	api.route('/api/players').get(players.getPlayers);          //list
	api.route('/api/players/new').post(players.createPlayer);   //C
	api.route('/api/players/:id').get(players.getPlayer);       //R 
	api.route('/api/players/:id').post(players.updateGame);     //U game status
	api.route('/api/players/:id').delete(players.deletePlayer); //D
    
    api.all("*", (req, res, next) => {
        console.log(" ---- INVOKING ANGULAR FOR ROUTING ----");
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });

};
