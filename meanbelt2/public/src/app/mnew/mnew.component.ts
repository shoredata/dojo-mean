import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-mnew',
    templateUrl: './mnew.component.html',
    styleUrls: ['./mnew.component.css']
})
export class MnewComponent implements OnInit {
    @Input() movieToCreate: any;
    @Input() reviewToCreate: any;
    @Output() aMovieCreatedEmitter = new EventEmitter();
    @Output() aCloseNewMovieEmmitter = new EventEmitter();

    //newRating: any;

    errors = [];

    reviewer: any;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.reviewer = "";
        this.movieToCreate = { title: "" };
        this.reviewToCreate = { reviewer: "", rating: 5, review: "" };
    }

    triggerMovieReviewCreate(){
        console.log("triggerMovieReviewCreate: ", this.movieToCreate, this.reviewToCreate);
        let observable = this._dataService.postOneMovie(this.movieToCreate);
        observable.subscribe(
            movie => {
                console.log("Movie Created", movie);

                console.log("Creating Review ..." );

                let mynewmovieid = "";

                let observable = this._dataService.postReviewOneMovie(mynewmovieid, this.reviewToCreate);
                observable.subscribe(
                    review => {
                        console.log("Review Created", review);


                        this.aMovieCreatedEmitter.emit();
        
                        // this._router.navigate(['/pets']);



                        return;
                    },
                    err => {
                        console.log("Create Review Error A: ", err.error.errors);
                        this.errors = err.error.errors;
                        return;
                    }
                )
            },
            err => {
                console.log("Create Review Error B:", err.error.errors);
                this.errors = err.error.errors;
                return;
            }
        )
    }


}


