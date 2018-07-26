'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

    rest: any;
    id: any;  //rest
    revw: any;    //right

    errors = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.id = undefined;
        // this.rest = undefined;
        this.revw = { name: "", rating: "5", review: "" };
        this._route.params.subscribe((params: Params) => {
            this.id = params['id'];
            let observable = this._dataService.getOne(this.id);
                observable.subscribe(data => {
                    this.rest = data;
            })
        });
    }

    triggerCreate(){
        let observable = this._dataService.postUpdateReview(this.id, this.revw);
        observable.subscribe(
            nreview => {
                this._router.navigate(['/restaurants', this.id]);
                // return;
            },
            err => {
                console.log("Create Error: ", err.error.errors);
                this.errors = this.unpackErrors(err);
                return;
            }
        )
    }


    cancelCreate() {
        this._router.navigate(['/restaurants', this.id]);
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


