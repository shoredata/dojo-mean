import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    players = [];
    gameNumber: number;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) {
        this.players = [];
        this.gameNumber = undefined;
    }

    ngOnInit(){
        this._route.params.subscribe((params: Params) => {
            this.gameNumber = params['number'];
        });
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

    setPlaying(action, playerData) {
        //0=undecided, 1=notplaying, 2=playing
        let newData = {};
        if (this.gameNumber==1){
            newData['game1'] = action;
        }
        else if (this.gameNumber==2) {
            newData['game2'] = action;
        }
        else {
            newData['game3'] = action;
        }
        let observable = this._dataService.postGameUpdate(playerData._id, newData);
        observable.subscribe(data => {
            // this.players = [];   
            this.getPlayers();           
        });

    }



}
