import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Task } from './task.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    @Input() taskToShow: any;  // use the @Input decorator to indicate this comes from the parent
    @Output() aTaskEventEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    // triggerEventUpdate(eventData){
        // console.log("aaa Using form @output to update:", this.taskToShow);
    triggerEventUpdate(){
        console.log("aaa component form update:", this.taskToShow);
        this.aTaskEventEmitter.emit(this.taskToShow); //we can pass in any data type
    }
    formEventUpdate(){
        console.log("bbb component form update:", this.taskToShow);
        this.aTaskEventEmitter.emit(this.taskToShow); //we can pass in any data type
    }

}

