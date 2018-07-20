import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-aedit',
    templateUrl: './aedit.component.html',
    styleUrls: ['./aedit.component.css']
})
export class AeditComponent implements OnInit {
    @Input() authorToEdit: any; 
    @Output() aAuthorUpdateEmitter = new EventEmitter();
    @Output() aAuthorCancelUpdateEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    triggerAuthorUpdate(){
        console.log("CLICK: update:", this.authorToEdit);
        this.aAuthorUpdateEmitter.emit(this.authorToEdit);
    }
    cancelAuthorUpdate(){
        console.log("CLICK: cancel");
        this.aAuthorCancelUpdateEmitter.emit(); 
    }

}





