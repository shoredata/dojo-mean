import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

    pets = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit(){
        this.getPetsFromService();
    }

    // list
    getPetsFromService(){
        // console.log("getAuthorsFromService() .. ");
        let observable = this._dataService.getPets();
        observable.subscribe(data => {
            let arr = <Array<any>>data;
            arr.sort(this.sortFunction);
            this.pets = arr;
        });
    }

    sortFunction(a, b) {
        let a1 = String(a.type + a.name).toUpperCase(), b1 = String(b.type + b.name).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            return (a1<b1) ? -1 : 1;
        }
    }

}


