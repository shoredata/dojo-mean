import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
    selector: 'app-pedit',
    templateUrl: './pedit.component.html',
    styleUrls: ['./pedit.component.css']
})
export class PeditComponent implements OnInit {
    petToShow: any; 
    myId: string;
    errors = [];    

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() { 
        this.errors = [];
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

    cancelPetUpdate() {
        // console.log("===CLOSE PET====") ;
        this._router.navigateByUrl('/pets');
    }

    triggerPetUpdate(){
        // console.log("triggerPetUpdate:", this.petToShow);
        let observable = this._dataService.patchUpdatePet(this.myId, this.petToShow);
        observable.subscribe(
            data => {
                // console.log("Pet Updated", data);
                this._router.navigateByUrl('/pets');
                return;

            },
            err => {
                console.log("Update Pet Error:", err.error.errors);
                this.errors = err.error.errors;
            }
        )
    }


}

