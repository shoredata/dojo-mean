'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
const utils = require('../../../../server/config/utils');

@Component({
    selector: 'app-pnew',
    templateUrl: './pnew.component.html',
    styleUrls: ['./pnew.component.css']
})
export class PnewComponent implements OnInit {
    
    productToCreate: any;

    errors = [];

    priceok: Boolean;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { 
        // this.productToCreate = { title: "a", price: "a", image: "a" };
        // console.log("a");
    }

    ngOnInit() { 
        this.productToCreate = { title: "", price: "", image: "" };
        this.priceok = utils.isNumeric(this.productToCreate.price);
        // console.log("b");
    }

    onPriceChange(event: any){
        this.priceok = utils.isNumeric(this.productToCreate.price);
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else
        {
            this.errors = [];
        }
    }
    

    triggerCreate(){
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else
        {
            let observable = this._dataService.postOne(this.productToCreate);
            observable.subscribe(
                review => {
                    this._router.navigate(['/products']);
                    return;
                },
                err => {
                    console.log("Create Error: ", err.error.errors);
                    this.errors = this.unpackErrors(err);
                    return;
                }
            )
        }
    }


    unpackErrors(error) {
        console.log("unpackErrors");
        let errs = [];
        console.log(Array(50).join("*"));
        console.log(error);
        for (var e in error.error.errors){
            let serr = error.error.errors[e].path + ": " + error.error.errors[e].name + " = " + error.error.errors[e].message;
            console.log(serr);
            serr = "Error: " + error.error.errors[e].message.replace("Path ", "");
            errs.push(serr);
        }
        return errs;
    }




}


