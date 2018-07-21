import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-pet',
    templateUrl: './pet.component.html',
    styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
    myId: string;
    petToShow: any;
    boolLiked: boolean;

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() {
        this.petToShow = undefined;
        this.boolLiked = false;
        this._route.parent.params.subscribe((params: Params) => console.log("A:", "parent params: ", params))
        this._route.params.subscribe((params: Params) => {
            this.myId = params['id'];
            // console.log("Have Pet Id: ", this.myId)
            this.getPetData();
        });
    }

    getPetData() {
        let observable = this._dataService.getPet(this.myId);
        observable.subscribe(data => {
            this.petToShow = data;
            // console.log("Have Pet Data: ", data);
        })
    }

    triggerClosePetDisplay() {
        // console.log("===CLOSE PET====") ;
        this._location.back();
    }

    triggerLike(){
        // console.log("triggerLike()");
        if (this.boolLiked) {
            console.log("ignoring ...");
        }
        else {
            // console.log("Liking!!");
            let observable = this._dataService.putLikePet(this.petToShow._id);
            observable.subscribe(
                data => {
                    this.getPetData();
                },
                err => {
                    // console.log("Like Error:", err.error.errors);
                    // // for (var idx=0; idx<err.error.errors.length; idx++) {
                    // //     console.log("A", idx, err.error.errors[idx]);
                    // // }
                    // this.errors = err.error.errors;
                }
            )
            this.boolLiked = true;
        }
    }

    triggerDelete(){
        // console.log("triggerDelete()");
        let observable = this._dataService.deletePet(this.petToShow._id);
        observable.subscribe(
            data => {
                this.triggerClosePetDisplay();
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
