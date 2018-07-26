import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-redit',
    templateUrl: './redit.component.html',
    styleUrls: ['./redit.component.css']
})
export class ReditComponent implements OnInit {
    @Input() rest: any;     
    @Output() aEditedEmitter = new EventEmitter();
    @Output() aCloseEmmitter = new EventEmitter();

    errors = [];
    orig: any;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.orig = this.rest;
    }

    cancelUpdate(){
        // console.log("CLICK: cancel");
        this.rest = this.orig;
        this.aCloseEmmitter.emit(); 
    }

    unpackErrors(error) {
        console.log("unpackErrors");
        let errs = [];
        console.log(Array(50).join("*"));
        console.log(error);
        for (var e in error.error.errors){
            let serr = error.error.errors[e].path + ": " + error.error.errors[e].name + " = " + error.error.errors[e].message;
            console.log(serr);
            serr = error.error.errors[e].message.replace("Path ", "");
            errs.push(serr);
        }
        return errs;
    }

    triggerUpdate(){
        // console.log("CLICK: update:", this.rest);

        let r = {
            //  name: this.petToShow.name,
             name: this.rest.name,
             cuisine: this.rest.cuisine,
             updated_at: Date.now().toLocaleString,
            //  id: this.rest._id,
        }
        // if (this.petToShow.name != this.petNameOriginal) {
        //     console.log("triggerPetUpdateV2:", this.petToShow);
        //     this.simplePet['name'] = this.petToShow.name;
        // };
        // console.log("triggerPetUpdateV2:", this.simplePet);
        let observable = this._dataService.postUpdateOne(this.rest._id, r);
        observable.subscribe(
            data => {
                // console.log("Updated", data);

                this.aEditedEmitter.emit(); 

                //this.aEditedEmitter.emit();
                this.aCloseEmmitter.emit(); 

                // return;

            },
            err => {
                console.log("Update Error:", err.error.errors);
                this.errors = this.unpackErrors(err);
            }
        )
       



    }

}

