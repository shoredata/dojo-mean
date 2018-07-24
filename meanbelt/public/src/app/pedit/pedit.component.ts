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
    petNameOriginal: any;
    petToShow: any; 
    myId: string;
    errors = [];    


    simplePet = {};

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
            this.petNameOriginal = this.petToShow.name;
            // console.log("Have Pet Data: ", data);
        })
    }

    cancelPetUpdate() {
        // console.log("===CLOSE PET====") ;
        this._router.navigate(['/pets']);
    }

    triggerPetUpdate(){
        // console.log("triggerPetUpdate:", this.petToShow);
        let observable = this._dataService.patchUpdatePet(this.myId, this.petToShow);
        observable.subscribe(
            data => {
                // console.log("Pet Updated", data);
                this._router.navigate(['/pets']);
                return;

            },
            err => {
                console.log("Update Pet Error:", err.error.errors);
                this.errors = err.error.errors;
            }
        )
    }

    triggerPetUpdateV2() {
         this.simplePet = {
            //  name: this.petToShow.name,
             type: this.petToShow.type,
             description: this.petToShow.description,
             skill1: this.petToShow.skill1,
             skill2: this.petToShow.skill2,
             skill3: this.petToShow.skill3,
             updated_at: Date.now(),
            //  id: this.petToShow._id,
        }
        if (this.petToShow.name != this.petNameOriginal) {
            console.log("triggerPetUpdateV2:", this.petToShow);
            this.simplePet['name'] = this.petToShow.name;
        };
        console.log("triggerPetUpdateV2:", this.simplePet);
        let observable = this._dataService.postUpdatePetV2(this.myId, this.simplePet);
        observable.subscribe(
            data => {
                console.log("Pet Updated", data);
                this._router.navigate(['/pets']);
                return;

            },
            err => {
                console.log("Update Pet Error:", err.error.errors);
                this.errors = this.unpackErrors(err);
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
            serr = "Pet Error: " + error.error.errors[e].message.replace("Path ", "");
            errs.push(serr);
        }
        return errs;
    }


}

