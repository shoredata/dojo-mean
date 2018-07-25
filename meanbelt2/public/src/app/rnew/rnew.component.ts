import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-rnew',
    templateUrl: './rnew.component.html',
    styleUrls: ['./rnew.component.css']
})
export class RnewComponent implements OnInit {
    errors = [];

    myMovieId: any;

    reviewToCreate: any;

    reviewer: any;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this._route.parent.params.subscribe((params: Params) => {
            this.myMovieId = params['id'];
            console.log("B:", "id: ", this.myMovieId); 
            this.reviewer = "";
            this.reviewToCreate = { reviewer: "", rating: 5, review: "" };
        });
    }

    triggerReviewCreate(){
        console.log("triggerReviewCreate: ", this.myMovieId, this.reviewToCreate);
        let observable = this._dataService.postReviewOneMovie(this.myMovieId, this.reviewToCreate);
        observable.subscribe(
            movie => {
                console.log("Review Created", movie);
                this._router.navigate(['/movies', 'this.myId']);
                return;
            },
            err => {
                console.log("Create Review Error B:", err.error.errors);
                this.errors = err.error.errors;
                return;
            }
        )
    }

    cancelReviewCreate() {
        this._router.navigate(['/movies', 'this.myId']);
    }


}
