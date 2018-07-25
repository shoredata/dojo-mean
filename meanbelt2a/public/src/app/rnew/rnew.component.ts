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
    
    myId: string;
    movieToShow: any;
    reviewToCreate: any;

    errors = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.movieToShow = undefined;
        this.myId = undefined;
        this.reviewToCreate = { reviewer: "", rating: 5, review: "" };

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

    cancelCreate() {
        this._router.navigate(['/movies', this.myId]);
    }

    triggerReviewCreate(){
        // console.log("triggerReviewCreate: ", this.myId, this.reviewToCreate);
        let observable = this._dataService.postReviewOneMovie(this.myId, this.reviewToCreate);
        observable.subscribe(
            review => {
                // console.log("Review Created", review);
                this._router.navigate(['/movies', this.myId]);
                return;
            },
            err => {
                console.log("Create Review Error C: ", err.error.errors);
                this.errors = this.unpackErrors(err);
                return;
            }
        )
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

