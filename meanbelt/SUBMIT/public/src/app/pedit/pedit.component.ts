import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pedit',
    templateUrl: './pedit.component.html',
    styleUrls: ['./pedit.component.css']
})
export class PeditComponent implements OnInit {
    @Input() petToEdit: any; 
    @Output() aPetUpdateEmitter = new EventEmitter();
    @Output() aPetCancelUpdateEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { 

    }

    triggerPetUpdate(){
        console.log("CLICK: update:", this.petToEdit);
        this.aPetUpdateEmitter.emit(this.petToEdit);
    }
    cancelPetUpdate(){
        console.log("CLICK: cancel");
        this.aPetCancelUpdateEmitter.emit(); 
    }

}

