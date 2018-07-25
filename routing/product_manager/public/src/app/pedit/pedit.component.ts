'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
const utils = require('../../../../server/config/utils');

@Component({
    selector: 'app-pedit',
    templateUrl: './pedit.component.html',
    styleUrls: ['./pedit.component.css']
})
export class PeditComponent implements OnInit {
   
    product: any;
    id: any;
    errors = [];
    priceok: Boolean;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }


    ngOnInit() { 
        this.id = undefined;
        this._route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.getProduct();
        });
    }

    getProduct() {
        let observable = this._dataService.getOne(this.id);
        observable.subscribe(data => {
            // console.log("Have Movie: id, data:: ", this.myId, data);
            this.product = data;
            this.priceok = utils.isNumeric(this.product.price);
        })
    }



    onPriceChange(event: any){
        this.priceok = utils.isNumeric(this.product.price);
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else {
            this.errors = [];
        }
    }
    

    triggerUpdate(){
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else {
            let p = {
                price: this.product.price, 
                title: this.product.title, 
                image: this.product.image,
                updated_at: Date.now(),
            };
            let observable = this._dataService.postUpdate(this.id, p);
            observable.subscribe(
                review => {
                    this._router.navigate(['/products']);
                    return;
                },
                err => {
                    console.log("Update Error: ", err.error.errors);
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


