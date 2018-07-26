'use strict';
declare var require: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
const utils = require('../../../../server/config/utils');

@Component({
    selector: 'app-ritems',
    templateUrl: './ritems.component.html',
    styleUrls: ['./ritems.component.css']
})
export class RitemsComponent implements OnInit {

    rest: any;
    id: any;  //rest
    food: any;      //left
    review: any;    //right

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
        this.rest = undefined;
        this.food = { name: "", price: "", rating: "5", description: "" };
        this.review = { name: "", rating: "5", description: "" };
        this.priceok = utils.isNumeric(this.food.price);
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

    onPriceChange(event: any){
        this.priceok = utils.isNumeric(this.food.price);
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else
        {
            this.errors = [];
        }
    }

    triggerFoodCreate(){
        if (!this.priceok) {
            this.errors = ['Price Error: Enter a valid numeric Price.'];
        }
        else
        {
            // console.log("triggerFoodCreate()", this.id, this.food);
            let observable = this._dataService.postUpdateFood(this.id, this.food);
            observable.subscribe(
                nfood => {
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
    }

    triggerReviewCreate(){
        let observable = this._dataService.postUpdateReview(this.id, this.review);
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
            serr = "Error: " + error.error.errors[e].message.replace("Path ", "");
            errs.push(serr);
        }
        return errs;
    }




}


