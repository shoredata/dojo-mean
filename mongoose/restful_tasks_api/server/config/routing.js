// import Task from '../controllers/task';
const Task = require('../controllers/task');

module.exports = api => {
	// api.route('/').get(Task.list);
	api.route('/tasks').get(Task.list);
	api.route('/tasks/:taskId').get(Task.get);
	api.route('/tasks').post(Task.post);
	api.route('/tasks/:taskId').put(Task.put);
	api.route('/tasks/:taskId').delete(Task.delete);
};



// const mongoose = require('mongoose'), 
//     tasks = require('../controllers/tasks')


// module.exports = function(app) {

//     //  get/tasks list
//     app.get('/tasks', function(req, res){
//         tasks.list(req, res);
//     })

//     //redundancy for index/default
//     app.get('/', function(req, res){
//         tasks.list(req, res);
//     })

//     // get/:id view
//     app.get('/tasks/:id', function(req, res){
//         tasks.view(req, res);
//     })

//     // post/tasks add
//     app.post('/tasks', function (req, res) {
//         tasks.add(req, res);
//     })

//     // put/tasks/:id update
//     app.post('tasks/:id', function (req, res) {
//         tasks.update(req, res);
//     })

//     // delete/tasks/:id delete
//     app.delete('/tasks/:id', function(req, res) {
//         tasks.edit(req, res);
//     })



// }  
