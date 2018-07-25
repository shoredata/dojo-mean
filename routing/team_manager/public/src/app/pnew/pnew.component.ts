import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-pnew',
    templateUrl: './pnew.component.html',
    styleUrls: ['./pnew.component.css']
})
export class PnewComponent implements OnInit {
    
    playerToCreate: any;

    errors = [];

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.playerToCreate = { name: "", position: "" };
    }

    cancelCreate() {
        this._router.navigate(['/players/list']);
    }

    triggerPlayerCreate(){
        // console.log("triggerReviewCreate: ", this.myId, this.reviewToCreate);
        let observable = this._dataService.postPlayer(this.playerToCreate);
        observable.subscribe(
            review => {
                this._router.navigate(['/players/list']);
                return;
            },
            err => {
                console.log("Create Player Error: ", err.error.errors);
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


