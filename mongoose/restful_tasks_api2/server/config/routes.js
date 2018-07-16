// import Task from '../controllers/task';
const Task = require('../controllers/task');

module.exports = api => {
    // api.route('/').get(Task.list);
	api.route('/api/tasks').get(Task.list);                 //list
	api.route('/api/tasks').post(Task.post);                //C
	api.route('/api/tasks/:taskId').get(Task.get);          //R
	api.route('/api/tasks/:taskId').put(Task.put);          //U
	api.route('/api/tasks/:taskId').delete(Task.delete);    //D
};
