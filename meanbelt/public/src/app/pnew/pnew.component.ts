import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { PetComponent } from '../pet/pet.component';

@Component({
    selector: 'app-pnew',
    templateUrl: './pnew.component.html',
    styleUrls: ['./pnew.component.css']
})

export class PnewComponent implements OnInit {

    petToCreate: any;
    errors = [];    

    constructor(
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) { }

    ngOnInit() {         
        this.petToCreate = { name:"", description:"", type:"", likes:0, skill1:"", skill2:"", skill3:"" };
        this.errors = [];
    }
    
    //from:
    // https://stackoverflow.com/questions/33571605/angular-2-how-to-navigate-to-another-route-using-this-router-parent-navigate
    // //link directly to route from code:
    // import {Router} from '@angular/router';
    // this.router= Router;
    // this.router.navigateByUrl('/login');

    triggerPetCreate(){
        // console.log("triggerPetCreate:", this.petToCreate);
        let observable = this._dataService.postNewPet(this.petToCreate);
        observable.subscribe(
            data => {
                // console.log("Pet Created", data);
                this._router.navigateByUrl('/pets');
                return;

            },
            err => {
                console.log("Create Pet Error:", err.error.errors);
                this.errors = err.error.errors;
                return;
            }
        )
    }

    cancelPetCreate(){
        // console.log("CLICK: Cancel");
        this._router.navigateByUrl('/pets');
    }

}
