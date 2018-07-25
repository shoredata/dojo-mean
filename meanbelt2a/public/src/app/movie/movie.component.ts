import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

    myId: string;
    movieToShow: any;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { 
        this.movieToShow = undefined;
        this.myId = undefined;
    }

    ngOnInit(){
        this._route.params.subscribe((params: Params) => {
            this.myId = params['id'];
            // console.log("B:", "id: ", this.myId); 
            this.getMovie();
        });
    }


    getMovie() {
        let observable = this._dataService.getMovie(this.myId);
        observable.subscribe(data => {
            // console.log("Have Movie: id, data:: ", this.myId, data);
            this.movieToShow = data;
        })
    }


    deleteMovie() {
        // console.log("deleteMovie()");
        let observable = this._dataService.deleteMovie(this.myId);
        observable.subscribe(
            data => {
                this._router.navigate(['/movies']);
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


    deleteReview(review) {
        let observable = this._dataService.deleteReview(this.myId, review._id);
        observable.subscribe(
            data => {
                // this.movieToShow = undefined;
                this.getMovie();
                // this._router.navigate(['/movies']);
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
