import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PetComponent } from '../pet/pet.component';

@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

    pets = [];
    newPet: any;
    selectedPet: any;
    editedPet: any;

    errors = [];

    isValid: boolean = true; //clear this when the authors are modified in author = need to refresh


    constructor(private _dataService: DataService){ }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getPetsFromService();
        this.clearLocal();
    }
    clearLocal() {
        this.newPet = undefined;
        this.selectedPet = undefined;
        this.editedPet = undefined;
        this.errors = [];
    }

    // LOCAL FORM EVENTS ==================================================================================

    petToShow(pet) {
        // console.log("authorToShow() ... Assigning selectedAuthor:", author);
        this.clearLocal();
        this.selectedPet = pet;
    }

    petToEdit(pet) {
        console.log("petToEdit() ... Assigning editedPet:", pet);
        this.clearLocal();
        this.editedPet = pet;


    }

    createPet() {
        // console.log("createAuthor() ...");
        this.clearLocal();
        this.newPet = { name:"", description:"", type:"", likes:0, skill1:"", skill2:"", skill3:"" };
    }

    // authorToDelete(author) {
    //     // console.log("authorToDelete() .. Deleting Author: ", author);
    //     let observable = this._dataService.deleteAuthor(author._id);
    //     observable.subscribe(
    //         data => {
    //             this.ngOnInit();
    //         },
    //         err => {
    //             console.log("Delete Author Error:", err.error.errors);
    //             // for (var idx=0; idx<err.error.errors.length; idx++) {
    //             //     console.log("A", idx, err.error.errors[idx]);
    //             // }
    //             this.errors = err.error.errors;
    //         }
    //     )
    // }

    // CHILD METHODS ===========================================================================================

    petModifiedReloadMsgFromChild(petId){
        console.log("RELOAD ALL HERE!!");
    }

    petClosedMsgFromChild(){
        this.clearLocal();
        this.getPetsFromService();
    }


    petUpdatedMsgFromChild(petData){
        console.log("petUpdatedMsgFromChild:", petData);
        let observable = this._dataService.patchUpdatePet(petData._id, petData);
        observable.subscribe(
            data => {
                this.ngOnInit();
            },
            err => {
                console.log("Update Pet Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
    }

    petUpdateClosedMsgFromChild(){
        console.log("authorCancelUpdateFromChild:");
        this.editedPet = undefined;
        this.errors = [];
    }



    petCreatedMsgFromChild(petData){
        console.log("petCreatedMsgFromChild:", petData);
        let observable = this._dataService.postNewPet(petData);
        observable.subscribe(
            data => {
                this.ngOnInit();
            },
            err => {
                console.log("Create Pet Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
    }

    petCreateClosedMsgFromChild(){
        console.log("petCreateClosedMsgFromChild:");
        this.newPet = undefined;
        this.errors = [];
    }


    // SERVICE METHODS =========================================================================================

    // list
    getPetsFromService(){
        // console.log("getAuthorsFromService() .. ");
        let observable = this._dataService.getPets();
        observable.subscribe(data => {
            this.pets = <Array<any>>data;
            this.isValid = true;
            // console.log("Authors: ", this.authors.length, this.authors);
        });
    }

    // toggleValid() {
    //     this.isValid = !this.isValid;
    // }


}


