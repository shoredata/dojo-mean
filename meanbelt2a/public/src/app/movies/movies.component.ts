import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    movies = [];
    newMovie: any;
    newReview: any;
    reload: boolean;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit(){
        this.reload = false;
        this.newMovie = undefined;
        this.newReview = undefined;
        this.movies = [];
        this.getMovies();
    }


    // list
    getMovies(){
        let observable = this._dataService.getMovies();
        observable.subscribe(data => {

            //to sort
            let arr = <Array<any>>data;
            arr.sort(this.sortFunction);
            this.movies = arr;

            //unsorted
            // console.log("Got Moview");
            // this.movies = <Array<any>>data;
            // console.log(this.movies);
        });
    }

    sortFunction(a, b) {
        let a1 = String(a.rating + a.created_at).toUpperCase(), b1 = String(b.rating + b.created_at).toUpperCase();
        if (a1===b1) {
            return 0;
        }
        else {
            return (a1>b1) ? -1 : 1;
        }
    }    

    createMovie() {
        this.newMovie = {};        
        this.newReview = {};        
    }

    moviesModifiedReloadMsgFromChild() {
        // console.log(" ====RELOAD MOVIES !!! ===);")
        this.reload = true;
    }

    newMovieClosedMsgFromChild () {
        this.newMovie = undefined;
        this.newReview = undefined;
        if (this.reload==true) {
            this.ngOnInit();
        }

    }


}
