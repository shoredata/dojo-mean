//import Task from '../models/task';
const Task = require('../models/task');
var utils = require('../../utils');


// retrieve a list of all tasks = list
exports.list = (req, res) => {
    const query = req.query || {};
    console.log(Array(50).join("*") + "\nList: ", utils.formatDate(new Date())); // ok

	Task.find(query)
		.then(tasks => {
			res.json(tasks);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});

};

// retrieve a specific obj using the id = R
exports.get = (req, res) => {
    const data = Object.assign(req.body, { _id: req.params.taskId }) || {};
    console.log(Array(50).join("*") + "\nGet (R): ", data, utils.formatDate(new Date())); // ok
	Task.findById(data)
		.then(task => {
			console.log(task);
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};

// update a specific task = U
exports.put = (req, res) => {
	const data = Object.assign(req.body, { task: req.params }) || {};
    console.log(Array(50).join("*") + "\nPut (U): ", data, utils.formatDate(new Date())); // ok

	Task.findByIdAndUpdate({ _id: data._id }, data)
		.then(task => {
			if (!task) {
				return res.sendStatus(404);
			}
			console.log(task);
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};

// create a task = C
exports.post = (req, res) => {
    const data = Object.assign({}, req.body, { task: req.body }) || {};
    console.log(Array(50).join("*") + "\nPost (C): ", data, utils.formatDate(new Date())); // ok
    
	Task.create(data)
		.then(task => {
			console.log(task);
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send(err);
		});
};


// remove a task record = D
exports.delete = (req, res) => {
    console.log(Array(50).join("*") + "\nDelete (D): ", req.params, utils.formatDate(new Date())); // ok
	Task.findByIdAndRemove(
		{ _id: req.params.taskId },
	)
    .then(task => {
        if (!task) {
            return res.sendStatus(404);
        }
        //return deleted task ...
        console.log(task);
        res.json(task);
        // //to send n204==no content
        // res.sendStatus(204);
    })
    .catch(err => {
        console.log(err);
        res.status(422).send(err.errors);
    });
};