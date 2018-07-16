//import Task from '../models/task';
const Task = require('../models/task');



// function updateDocument(doc, SchemaTarget, data) {
//     for (var field in SchemaTarget.schema.paths) {
//        if ((field !== '_id') && (field !== '__v')) {
//             var newValue = getObjValue(field, data);
//             console.log('data[' + field + '] = ' + newValue);
//             if (newValue !== undefined) {
//                 setObjValue(field, doc, newValue);
//           }  
//        }  
//     }
//     return doc;
// };

// function getObjValue(field, data) {
//     return _.reduce(field.split("."), function(obj, f) { 
//         if(obj) return obj[f];
//     }, data);
// }

// function setObjValue(field, data, value) {
//   var fieldArr = field.split('.');
//   return _.reduce(fieldArr, function(o, f, i) {
//      if(i == fieldArr.length-1) {
//           o[f] = value;
//      } else {
//           if(!o[f]) o[f] = {};
//      }
//      return o[f];
//   }, data);
// }

// implement as:
// app.put('/record/:id', function(req, res) {
//   Record.findById(req.params.id, function(err, doc) {
//     if (!err) {
//       utils.updateDocument(doc, Record, req.params);
//       doc.save();
//     ...


// retrieve a list of all tasks
exports.list = (req, res) => {
    const query = req.query || {};
    console.log("List:"); // ok

	Task.find(query)
		.then(tasks => {
			res.json(tasks);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});

};

// retrieve a specific obj using the id
exports.get = (req, res) => {
    const data = Object.assign(req.body, { _id: req.params.taskId }) || {};
    console.log("Get:", data); //ok
	Task.findById(data)
		.then(task => {
            //hide it from json
			task.hidden = undefined;
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};

// update a specific task
exports.put = (req, res) => {
	const data = Object.assign(req.body, { task: req.params }) || {};
    console.log("Put:", data);  //ok

	Task.findByIdAndUpdate({ _id: data._id }, data)
		.then(task => {
			if (!task) {
				return res.sendStatus(404);
			}
			task.hidden = undefined;
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};

// create a task
exports.post = (req, res) => {
    const data = Object.assign({}, req.body, { task: req.body }) || {};
    console.log("Post:", data); //ok
    
	Task.create(data)
		.then(task => {
			res.json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send(err);
		});
};


// remove a task record 
exports.delete = (req, res) => {
    console.log("Delete:", req.params); //ok
	Task.findByIdAndRemove(
		{ _id: req.params.taskId },
	)
    .then(task => {
        if (!task) {
            return res.sendStatus(404);
        }
        //return deleted task ...
        res.json(task);
        // //to send n204==no content
        // res.sendStatus(204);
    })
    .catch(err => {
        console.log(err);
        res.status(422).send(err.errors);
    });
};