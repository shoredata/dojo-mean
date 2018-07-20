import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pnew',
    templateUrl: './pnew.component.html',
    styleUrls: ['./pnew.component.css']
})
export class PnewComponent implements OnInit {
    @Input() petToCreate: any; 
    @Output() aPetCreateEmitter = new EventEmitter();
    @Output() aPetCancelCreateEmitter = new EventEmitter();

    constructor() { }
    ngOnInit() { 
        this.petToCreate = { name:"", description:"", type:"", likes:0, skill1:"", skill2:"", skill3:"" };
    }

    triggerPetCreate(){
        console.log("CLICK: Create:", this.petToCreate);
        this.aPetCreateEmitter.emit(this.petToCreate);
    }
    cancelPetCreate(){
        console.log("CLICK: Cancel");
        this.aPetCancelCreateEmitter.emit();
    }

}
