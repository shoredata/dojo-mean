//http://mongoosejs.com/docs/populate.html
const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
const utils = require('../config/utils');
const assert = require('assert')

module.exports = {

    //list
    getPets: function (req, res) {
        console.log(" getPets: "); //

        // Pet.find().sort({'type': 1}).exec(function(err, data) {
        //     if(err)
        //         return res.status(401).json(err);
        //     return res.json(data);
        // });

        // Pet.find({}, (err, data) => {
        //     if(err){
        //         return res.status(401).json(err);
        //     }
        //     return res.json(data);
        // })


        Pet.find({}, null, {sort: {'type': 1}}, function(err,userpost) {
            if(err)
                return res.send(err);
            return res.json(userpost);
        });

    },

    // C
    createPet: function (req, res) {
        console.log(" createPet: ", req.body); //
        var newPet = new Pet({ 
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            skill1: req.body.skill1,
            skill2: req.body.skill2,
            skill3: req.body.skill3,
            likes: 0,
        });
    
        var error = newPet.validateSync({ runValidators: true, context: 'query' })
        if (error) {
            let errs = [];
            console.log(Array(50).join("*"));
            for (var e in error.errors){
                let serr = error.errors[e].path + ": " +error.errors[e].name + " = " + error.errors[e].message;
                console.log(serr);
                serr = "Pet Error: " + error.errors[e].message.replace("Path ", "");
                errs.push(serr);
            }
            return res.status(500).json({ errors: errs });
        }
        else {
            Pet.findOne({name: req.body.name})
            .then(test_pet => {
                if (!test_pet) {
                    newPet.save((err) => {
                        if(err) {
                            return res.status(401).json(err);
                        }
                    });
                    return res.json("All clear!")
                }
                else {
                    let errs = [];
                    let serr = "Pet Error: Pet Name '" + req.body.name + "' already taken - choose another.";
                    errs.push(serr);
                    console.log(serr);
                    return res.status(500).json({ errors: errs });
                }
            })
            .catch(error => {
                let errs = [];
                console.log(Array(50).join("*"));
                for (var e in error.errors){
                    let serr = error.errors[e].path + ": " +error.errors[e].name + " = " + error.errors[e].message;
                    console.log(serr);
                    serr = "Pet Error: " + error.errors[e].message.replace("Path ", "");
                    errs.push(serr);
                }
                return res.status(500).json({ errors: errs });
            });
        }
    },

    // R
    getPet: function (req, res) {
        console.log(" getPet: ", req.params); //
        Pet.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                // console.log("There was an error getting: \n", err)
                return res.status(401).json(err);
            }
            return res.json(data);
        })
    },

    // U 
    updatePet: function (req, res) {
        console.log(" updatePet: ", req.params, req.body); //
        const data = Object.assign(req.body, { pet: req.params }) || {};

        var newPet = new Pet({
            name: data.name, 
            type: data.type,
            description: data.description,
            skill1: data.skill1,
            skill2: data.skill2,
            skill3: data.skill3,
            likes: data.likes,
        });
        // console.log("***", newPet);

        var error = newPet.validateSync()
        if (error) {
            let errs = [];
            console.log(Array(50).join("*"));
            for (var e in error.errors){
                let serr = error.errors[e].path + ": " +error.errors[e].name + " = " + error.errors[e].message;
                console.log(serr);
                serr = "Pet Error: " + error.errors[e].message.replace("Path ", "");
                // req.flash("danger", serr);   // FIND THIS!!!!!!
                errs.push(serr);
            }
            return res.status(500).json({ errors: errs});
        }





        Pet.findOne({name: data.name})
        .then(test_pet => {
            if (!test_pet) {

                //changing name & everything ok, does not exist!!!

                Pet.findByIdAndUpdate({ _id: req.params.id }, newPet)
                .then(pet => {
                    if (!pet) {
                        return res.sendStatus(404);
                    }
                    // console.log(pet);
                    res.json(pet);
                })
                .catch(err => {
                    // console.log("There was an error updating: \n", err)   ... look at err.errors !!!!
                    console.log("AQW");
                    return res.status(401).json(err);
                });
        
            }
            else {
                //name exists ... 
                if (test_pet._id == data._id) {
                    //if the ID is the same remove the name and try again ...

                    var p = {
                        type: data.type,
                        description: data.description,
                        skill1: data.skill1,
                        skill2: data.skill2,
                        skill3: data.skill3,
                        likes: data.likes,
                    };
            
                    console.log("QQS1", p);

                    Pet.findByIdAndUpdate({ _id: req.params.id }, p)
                    .then(pet => {
                        if (!pet) {
                            return res.sendStatus(404);
                        }
                        // console.log(pet);
                        res.json(pet);
                    })
                    .catch(err => {
                        // console.log("There was an error updating: \n", err)   ... look at err.errors !!!!
                        console.log("ERROR: Same name & Different IDs throws MONGOERROR .. E11000 duplicate key error collection: blah blahd ..");
                        return res.status(401).json(err);
                    });
    

                }
                else {
                    //nope ...
                    let errs = [];
                    let serr = "Pet Error: Pet Name '" + data.name + "' already taken - choose another.";
                    errs.push(serr);
                    console.log(serr);
                    return res.status(500).json({ errors: errs });
                }

            }
        })
        .catch(error => {
            let errs = [];
            console.log(Array(50).join("*"));
            for (var e in error.errors){
                let serr = error.errors[e].path + ": " +error.errors[e].name + " = " + error.errors[e].message;
                console.log(serr);
                serr = "Pet Error: " + error.errors[e].message.replace("Path ", "");
                errs.push(serr);
            }
            return res.status(500).json({ errors: errs });
        });
    },

    // U like = need to use $inc mongoose/mongo moethod instead !!!!
    likePet: function (req, res) {
        console.log(" likePet: ", req.params, req.body); //
        Pet.findOne({_id: req.params.id}, (err, pet) => {
            if(err) {
                return res.status(401).json(err);
            }
            else if (pet) {
                console.log("Incrementing likes for Pet ", pet.id);
                pet.likes = pet.likes + 1;
                pet.markModified('likes');  // ***************************
                pet.save();
                console.log("Likes Updated!", pet);
                return res.json(pet);
            }
            else 
            {
                console.log("Unknown, both err & pet == nothing .. check id");
                return res.status(500);
            }
        })
    },

    // D
    deletePet: function (req, res) {
        console.log(" deletePet: ", req.params); //
        Pet.findOneAndRemove({_id: req.params.id}, (err, cake) => {
            if(err) {
                return res.status(401).json(err);
            }
            return res.json("All clear!")
        })
    },


}


