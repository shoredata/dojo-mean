// All necessary requires, such as the Quote model.
const mongoose = require('mongoose'), 
    BearModel = mongoose.model('BearModel')


String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};
    

module.exports = {

    index: function(req, res) {
        console.log("GET", "/");
        BearModel.find({}).sort('-created_at').exec(function (err, all_bears) {
            if (err) {
                res.send(500, { error: 'Error building list of all Bears!' });
            }
            else {
                res.render('bears', { allBears: all_bears });
            }
        });
    },

    view: function(req, res) {
        console.log("GET", "/bears/view/:", req.params);
        BearModel.findById(req.params.bearid.toString().toObjectId(), function (err, thisBear) {
            if (err) {
                res.send(500, { error: 'Error building list of one Bear by id!' });            
            }
            else {
                res.render('bear', { thisBear: thisBear });
            }
        });
    },

    add: function(req, res) {
        console.log("GET", "/bears/new");
        res.render('bear_new');
    },

    insert: function(req, res) {
        console.log("POST: /bears/insert ..  inserting a bear", req.body);
        BearModel.create({ 
            name: req.body.name,
            sex: req.body.sex,
            age: req.body.age,
            markings: req.body.markings
        }, function (err, new_bear_model) {
            if (err){
                consold.log(err);
                res.send(500, { error: err });            
            } 
            else {
                console.log("Bear Saved!");
                res.redirect('/');
            }
        });
    },

    edit: function(req, res) {
        console.log("GET", "/bears/edit/:", req.params);
        BearModel.findById(req.params.bearid.toString().toObjectId(), function (err, thisBear) {
            if (err) {
                res.send(500, { error: 'Error building list of one Bear by id!' });            
            }
            else {
                // console.log(thisBear);
                res.render('bear_edit', { thisBear: thisBear });
            }
        });    
    },

    update: function(req, res) {
        console.log("POST: /bears/update ..  updating a bear", req.body);    
        BearModel.findById(req.body._id.toString().toObjectId(), function(err, p) {
            if (!p) {
                return next(new Error('Could not Bear to update HAHAHAHAH'));
            }
            else {
                p.updated_at = new Date();
                p.name = req.body.name;
                p.age = req.body.age;
                p.markings = req.body.markings;
                p.sex = req.body.sex;
                p.save(function(err) {
                    if (err) {
                        res.send(500, { error: 'Error updating bear by id!' });            
                    }
                    else {
                        console.log(p);
                        res.redirect('/bears/view/' + req.body._id.toString()); //show this bear                
                    }
                });
            }
        });
    },

    destroy: function(req, res) {
        console.log("GET", "/bears/destroy/:", req.params.bearid);
        BearModel.remove({_id: req.params.bearid.toString().toObjectId()}, (err) => {
            if (err) {
                res.send(500, { error: 'Error deleting bear by id!' });            
            }
            console.log("Bear Deleted!");
            res.redirect('/'); //show all bears
        });    
    }
    
};
