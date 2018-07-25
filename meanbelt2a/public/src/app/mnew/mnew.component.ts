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

    errors = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.movieToCreate = { title: "" };
        this.reviewToCreate = { reviewer: "", rating: 5, review: "" };
    }

    cancelCreate() {
        this.aCloseNewMovieEmmitter.emit();
    }

    triggerMovieReviewCreate(){
        // console.log("triggerMovieReviewCreate: ", this.movieToCreate, this.reviewToCreate);
        let observable = this._dataService.postOneMovie(this.movieToCreate);
        observable.subscribe(
            movie => {
                let mynewmovieid = movie["_id"];
                let observable = this._dataService.postReviewOneMovie(mynewmovieid, this.reviewToCreate);
                observable.subscribe(
                    review => {
                        this.aMovieCreatedEmitter.emit();
                        this.aCloseNewMovieEmmitter.emit();
                        return;
                    },
                    err => {
                        console.log("Create Review Error A: ", err.error.errors);
                        this.errors = this.unpackErrors(err);
                        return;
                    }
                )
            },
            err => {
                console.log("Create Review Error B:", err.error.errors);
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


