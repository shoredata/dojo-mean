import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { TaskComponent } from './task/task.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    tasks = [];
    newTask: any;
    selectedTask: any; //for TaskComponent

    constructor(private _httpService: HttpService){ }

    taskUpdateDataFromChild(taskData){
        console.log("taskUpdateDataFromChild:", taskData);
        this.onSubmitUpdateTask();
    }

    taskDeleteDataFromChild(taskData){
        console.log("taskDeleteDataFromChild:", taskData);
        this.onClickDeleteTask();
        this.selectedTask = undefined;
    }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getTasksFromService();
        this.newTask = { title: "", description: "" };
    }

    taskToShow(task) {
        console.log("Assigning selectedATask:", this.selectedTask);
        this.selectedTask = task;
    }

    // list
    getTasksFromService(){
        let observable = this._httpService.getTasks();
        observable.subscribe(data => {
            this.tasks = <Array<any>>data; //data['tasks'];

            // ^^ this is our return, I need it to cast data['tasks'] to an array before
            //  I can do anything on order to prevent ts errors (in addition to linter errors)
            // NOTE: .tasks is externally available to the rest of the app component!!!

            console.log("Got our tasks!", this.tasks)
            console.log("Task Count: ", this.tasks.length)
            
            // var myjson = JSON.stringify(this.tasks);
            // var mystr = JSON.parse(myjson);
            // console.log("JSON", myjson);
            // console.log("stringify", mystr);

            // for (var d =0; d < data['tasks'].length; d++) {
            //     console.log (d, "data['tasks'][d]: ", data['tasks'][d].description, data['tasks'][d].title);

            // }
            // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
            // This may be different for you, depending on how you set up your Task API.
        });
    }

    // C
    onSubmitCreateNewTask() {
        console.log("Creating New Task ...", this.newTask);

        let observable = this._httpService.postNewTask(this.newTask);
        observable.subscribe(data => {
            console.log("New Task:", data);
            this.selectedTask = data;
            //since we modified a task refresh the list of all tasks
            this.getTasksFromService();
        })

        // Reset this.newTask to a new, clean object.
        this.newTask = { title: "", description: "" }
        console.log("Create Complete!");
    }

    // R
    onClickGetTask(taskId) {
        console.log("Requesting Task ...", taskId);
        this.selectedTask = undefined;
        let observable = this._httpService.getATask(taskId);
        observable.subscribe(data => {
            console.log("Requested Task:", data);
            this.selectedTask = data;
        })
        console.log("Request Complete!");
    }

    // U
    onSubmitUpdateTask() {
        console.log("Updating Selected ...", this.selectedTask._id,  this.selectedTask);

        let observable = this._httpService.putATask(this.selectedTask._id, this.selectedTask);
        observable.subscribe(data => {
            console.log("Old Data for Updated Task:", data); //data is old!!!!!!!!!!!
            this.selectedTask = undefined;
            //since we modified a task refresh the list of all tasks
            this.getTasksFromService();
        })

        console.log("Update Complete!");
    }

    // D
    onClickDeleteTask() {
        console.log("Deleting Task ...", this.selectedTask);

        // call the service's method to deelete the task
        let observable = this._httpService.deleteATask(this.selectedTask._id);
        observable.subscribe(data => {
            console.log("Deleted Task:", data);
            this.selectedTask = undefined;
            //since we modified a task refresh the list of all tasks
            this.getTasksFromService();
        })

        console.log("Delete Complete!");
    }
    
}
