'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-rnew',
    templateUrl: './rnew.component.html',
    styleUrls: ['./rnew.component.css']
})
export class RnewComponent implements OnInit {
    
    rest: any;
    errors = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.rest = { name: "", cuisine: "" };
    }

    triggerCreate(){
        let observable = this._dataService.postOne(this.rest);
        observable.subscribe(
            review => {
                this._router.navigate(['/restaurants']);
                return;
            },
            err => {
                console.log("Create Error: ", err.error.errors);
                this.errors = this.unpackErrors(err);
                return;
            }
        )
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




}


