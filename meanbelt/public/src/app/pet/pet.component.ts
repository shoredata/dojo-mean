import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
    @Input() petToShow: any;
    @Output() aPetModifiedEmitter = new EventEmitter();
    @Output() aClosePetDisplayEmmitter = new EventEmitter();

    boolLiked: boolean;
    
    constructor(private _dataService: DataService){ }

    ngOnInit() {
        this.clearLocal();
        this.boolLiked = false;
    }

    clearLocal(){

    }

    getPetData() {
        // console.log("getAuthorData() ...");
        let observable = this._dataService.getPet(this.petToShow._id);
        observable.subscribe(data => {
            this.petToShow = data;
            console.log("Do Update");
        })
    }

    petEditFromChild(petData){
        // console.log("quoteCreateFromChild:", quoteData);
    //     let observable = this._dataService.postAddQuote(this.authorToShow._id, quoteData);
    //     observable.subscribe(
    //         data => {
    //             this.clearLocal();
    //             this.getAuthorData();
    //         },
    //         err => {
    //             console.log("Create Quote Error:", err.error.errors);
    //             // for (var idx=0; idx<err.error.errors.length; idx++) {
    //             //     console.log("A", idx, err.error.errors[idx]);
    //             // }
    //             this.errors = err.error.errors;
    //         }
    //     )
    //     this.aAuthorModifiedEmitter.emit(); 
    }

    petCancelEditFromChild(){
        // // console.log("quoteCancelCreateFromChild:");
        // this.clearLocal();
    }

    closePetDisplay() {
        this.aClosePetDisplayEmmitter.emit(); 
    }



    Like(){
        console.log("Like:");

        if (!this.boolLiked) {

            console.log("Liking!!");

            let observable = this._dataService.putLikePet(this.petToShow._id);
            observable.subscribe(
                data => {
                    // this.clearLocal();
                    this.aPetModifiedEmitter.emit(); 
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

    Delete(){
        console.log("Delete:");
        let observable = this._dataService.deletePet(this.petToShow._id);
        observable.subscribe(
            data => {
                this.aPetModifiedEmitter.emit(); 
                this.aClosePetDisplayEmmitter.emit(); 
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
