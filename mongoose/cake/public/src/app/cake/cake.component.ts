import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Task } from './task.component';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
    @Input() cakeToShow: any;
    @Output() aCakeEventUpdateEmitter = new EventEmitter();
    @Output() aCakeEventDeleteCakeEmitter = new EventEmitter();
    newRating: any;

    constructor() { }
    ngOnInit() { 
        this.newRating = { rating: 5, comment: "", cake: this.cakeToShow._id };
    }

    triggerCakeUpdate(){
        // console.log("triggerCakeUpdate: ", this.newRating);
        this.aCakeEventUpdateEmitter.emit(this.newRating);
    }

    triggerCakeDelete(){
        // console.log("triggerCakeDelete: ", this.cakeToShow._id);
        this.aCakeEventDeleteCakeEmitter.emit(this.cakeToShow._id);
    }


}

