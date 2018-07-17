import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { CakeComponent } from './cake/cake.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    cakes = [];
    newCake: any;
    newRating: any;
    selectedCake: any; //for CakeComponent

    constructor(private _httpService: HttpService){ }

    cakeDeleteCakeFromChild(cakeData){
        console.log("cakeDeleteCakeFromChild:", cakeData);
        this.newRating = cakeData;
        this.onClickDeleteCake();
    }

    cakeUpdateDataFromChild(ratingData){
        console.log("cakeUpdateDataFromChild:", ratingData);
        this.newRating = ratingData;
        this.onSubmitAddRating();
    }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getCakesFromService();
        this.newCake = { name: "", url: "" };
        this.newRating = { rating: 0, comment: "", cake: undefined };
    }

    cakeToShow(cake) {
        // console.log("Assigning selectedCake:", cake);
        this.selectedCake = cake;
    }

    // list
    getCakesFromService(){
        let observable = this._httpService.getCakes();
        observable.subscribe(data => {
            this.cakes = <Array<any>>data;
            // console.log("Got cakes: ", this.cakes.length, this.cakes);
        });
    }

    // C
    onSubmitCreateNewCake() {
        // console.log("Creating New Cake ...", this.newCake);

        let observable = this._httpService.postNewCake(this.newCake);
        observable.subscribe(data => {
            // console.log("New Cake:", data);
            this.selectedCake = undefined;
            this.getCakesFromService();
        })

        // Reset this.newCake to a new, clean object.
        this.newCake = { name: "", url: "" }
        // console.log("Create Complete!");
    }

    // R
    onClickGetCake(id) {
        console.log("Requesting Cake ...", id);
        this.selectedCake = undefined;
        let observable = this._httpService.getACake(id);
        observable.subscribe(data => {
            console.log("Requested Cake:", data);
            this.selectedCake = data;
        })
        console.log("Request Complete!");
    }

    // U add rating
    onSubmitAddRating() {
        console.log("Add Rating to Selected ...", this.selectedCake._id, this.newRating);
        var myId = this.selectedCake._id;

        let observable = this._httpService.putARating(this.selectedCake._id, this.newRating);
        observable.subscribe(data => {
            this.selectedCake = undefined;
            this.newRating = { rating: 0, comment: "", cake: undefined };
            this.getCakesFromService();
            // this.onClickGetCake(myId);
        })
        // console.log("Update/Add Rating Complete!");
    }

    //D 
    onClickDeleteCake() {
        console.log("Deleting Cake ...", this.selectedCake._id);
        let observable = this._httpService.deleteACake(this.selectedCake._id);
        observable.subscribe(data => {
            // console.log("Delete Successful");
            this.selectedCake = undefined;
            this.getCakesFromService();
        })
        // console.log("Delete Complete!");
    }

    
}
