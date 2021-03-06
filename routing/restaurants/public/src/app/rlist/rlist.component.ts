import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-rlist',
    templateUrl: './rlist.component.html',
    styleUrls: ['./rlist.component.css']
})
export class RlistComponent implements OnInit {

    restaurants = [];
    show = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit(){
        this.restaurants = [];
        this.show = [];
        this.get();
    }

    // list
    get(){
        let observable = this._dataService.getList();
        observable.subscribe(data => {

            //to sort
            let arr = <Array<any>>data;
            arr.sort(this.sortFunction);

            //this is stupid, but we're building an array to show the delete button if the 
            // created_at is less than 60000 ms from now ...
            // meaning it was created <= 1 minute ago.
            for (var idx=0; idx<arr.length; idx++) {
                var mylocal = new Date(arr[idx].created_at).getTime();
                var doshow = false;
                if (Date.now() - mylocal <= 60000 ){
                    doshow = true;
                }
                arr[idx]['show'] = doshow;
            }

            //simply sorted shoudl comment out above ...
            this.restaurants = arr;

            //unsorted
            // console.log("Got Moview");
            // this.movies = <Array<any>>data;
            // console.log(this.movies);
        });
    }

    sortFunction(a, b) {
        let a1 = String(a.created_at).toUpperCase(), b1 = String(b.created_at).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            //created_at > = newest first ....
            return (a1>b1) ? -1 : 1;
        }
    }    

    delete(data) {
        let local = new Date(data.created_at).getTime();
        let locale = new Date(data.created_at).toLocaleString();
        console.log(Date.now(), local, Date.now() - local);
        if (Date.now() - local <= 60000 )
        {
            console.log("Deleting ..");

            let observable = this._dataService.deleteOne(data._id);
            observable.subscribe(
                data => {
                    this.restaurants = [];
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
        else {
            alert("Unable to delete " + data.name + "\n It was created too long ago: \n" + data.created_at + "\n" + locale);
        }

    }



}
