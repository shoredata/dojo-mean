'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

    rest: any;
    reviews = [];
    id: any;  //rest

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { 
    }

    ngOnInit() { 
        this.id = undefined;
        this._route.params.subscribe((params: Params) => {
            this.id = params['id'];

            let observable = this._dataService.getOne(this.id);
            observable.subscribe(data => {
                // console.log("Have Movie: id, data:: ", this.myId, data);

                //to sort
                let arr = data['reviews'];
                arr.sort(this.sortFunction);
                this.reviews = arr;
                this.rest = data;
            })
        });
    }



    sortFunction(a, b) {
        let a1 = String(a.rating).toUpperCase(), b1 = String(b.rating).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            //created_at > = newest first ....
            return (a1>b1) ? -1 : 1;
        }
    }    



}


