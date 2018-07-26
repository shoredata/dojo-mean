'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
const utils = require('../../../../server/config/utils');

@Component({
    selector: 'app-rest',
    templateUrl: './rest.component.html',
    styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

    rest: any;
    id: any;  //rest

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.id = undefined;
        this.rest = undefined;
        this._route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.getRestaurant();
        });
    }

    getRestaurant() {
        let observable = this._dataService.getOne(this.id);
        observable.subscribe(data => {
            // console.log("Have Movie: id, data:: ", this.myId, data);
            this.rest = data;
        })
    }


}


