import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

    players = [];
    // newMovie: any;
    // newReview: any;
    // reload: boolean;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) {
        this.players = [];
    }

    ngOnInit(){
        // this.reload = false;
        // this.newMovie = undefined;
        // this.newReview = undefined;
        this.players = [];
        this.getPlayers();
    }

    // list
    getPlayers(){
        let observable = this._dataService.getPlayers();
        observable.subscribe(data => {

            //to sort
            let arr = <Array<any>>data;
            arr.sort(this.sortFunction);
            this.players = arr;

            //unsorted
            // console.log("Got Moview");
            // this.movies = <Array<any>>data;
            // console.log(this.movies);
        });
    }

    sortFunction(a, b) {
        let a1 = String(a.name + a.created_at).toUpperCase(), b1 = String(b.name + b.created_at).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            return (a1<b1) ? -1 : 1;
        }
    }    

    deletePlayer(playerData) {
        let observable = this._dataService.deletePlayer(playerData._id);
        observable.subscribe(
            data => {
                this.players = [];
                this.getPlayers();
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
