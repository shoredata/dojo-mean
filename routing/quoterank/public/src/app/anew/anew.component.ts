import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-anew',
    templateUrl: './anew.component.html',
    styleUrls: ['./anew.component.css']
})
export class AnewComponent implements OnInit {
    @Input() authorToCreate: any; 
    @Output() aAuthorCreateEmitter = new EventEmitter();
    @Output() aAuthorCancelCreateEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { 
        this.authorToCreate = { name: "", quotes: [] };
    }

    triggerAuthorCreate(){
        console.log("CLICK: Create:", this.authorToCreate);
        this.aAuthorCreateEmitter.emit(this.authorToCreate);
    }
    cancelAuthorCreate(){
        console.log("CLICK: Cancel");
        this.aAuthorCancelCreateEmitter.emit();
    }

}
