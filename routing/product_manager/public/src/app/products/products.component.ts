import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit(){
        this.products = [];
        this.get();
    }

    // list
    get(){
        let observable = this._dataService.getList();
        observable.subscribe(data => {

            //to sort
            let arr = <Array<any>>data;
            arr.sort(this.sortFunction);
            this.products = arr;

            //unsorted
            // console.log("Got Moview");
            // this.movies = <Array<any>>data;
            // console.log(this.movies);
        });
    }

    sortFunction(a, b) {
        let a1 = String(a.title).toUpperCase(), b1 = String(b.title).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            return (a1<b1) ? -1 : 1;
        }
    }    

    delete(data) {
        let observable = this._dataService.deleteOne(data._id);
        observable.subscribe(
            data => {
                this.products = [];
                this.get();
            },
            err => {
                // console.log("Delete Quote Error:", err.error.errors);
                // // for (var idx=0; idx<err.error.errors.length; idx++) {
                // //     console.log("A", idx, err.error.errors[idx]);
                // // }
                // this.errors = err.error.errors;
            }
        )
    }



}
