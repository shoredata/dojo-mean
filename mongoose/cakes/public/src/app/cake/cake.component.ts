import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Task } from './task.component';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
    @Input() cakeToShow: any;  // use the @Input decorator to indicate this comes from the parent
    @Output() aCakeEventUpdateEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    triggerEventUpdate(){
        console.log("CLICK: update:", this.cakeToShow);
        this.aCakeEventUpdateEmitter.emit(this.cakeToShow); //we can pass in any data type
    }
    triggerEventDelete(){
        console.log("CLICK: delete:", this.cakeToShow);
        this.aCakeEventUpdateEmitter.emit(this.cakeToShow); //we can pass in any data type
    }
    formEventUpdate(){
        console.log("ENTER: update:", this.cakeToShow);
        this.aCakeEventUpdateEmitter.emit(this.cakeToShow); //we can pass in any data type
    }

}

