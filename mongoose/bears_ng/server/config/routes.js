const mongoose = require('mongoose'), 
    bears = require('../controllers/bears')


module.exports = function(app) {

    // index = list all bears
    app.get('/', function(req, res){
        bears.index(req, res);
    })

    // show bear by id
    app.get('/bears/view/:bearid', function(req, res){
        bears.view(req, res);
    })

    app.get('/bears/new', function (req, res) {
        bears.add(req, res);
    })

    app.post('bears/insert', function (req, res) {
        bears.insert(req, res);
    })

    app.get('/bears/edit/:bearid', function(req, res) {
        bears.edit(req, res);
    })

    app.post('/bears/update', function (req, res) {
        bears.update(req, res);
    })

    app.get('/bears/destroy/:bearid', function(req, res) {
        bears.destroy(req, res);
    })


}  
