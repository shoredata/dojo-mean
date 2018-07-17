import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Task } from './task.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    @Input() taskToShow: any;  // use the @Input decorator to indicate this comes from the parent
    @Output() aTaskEventUpdateEmitter = new EventEmitter();
    @Output() aTaskEventDeleteEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    triggerEventUpdate(){
        console.log("CLICK: update:", this.taskToShow);
        this.aTaskEventUpdateEmitter.emit(this.taskToShow); //we can pass in any data type
    }
    triggerEventDelete(){
        console.log("CLICK: delete:", this.taskToShow);
        this.aTaskEventDeleteEmitter.emit(this.taskToShow); //we can pass in any data type
    }
    formEventUpdate(){
        console.log("ENTER: update:", this.taskToShow);
        this.aTaskEventUpdateEmitter.emit(this.taskToShow); //we can pass in any data type
    }

}

