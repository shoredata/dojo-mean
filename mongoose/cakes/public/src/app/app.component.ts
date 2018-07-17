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

    cakeUpdateDataFromChild(cakeData, ratingData){
        console.log("cakeUpdateDataFromChild:", cakeData, ratingData);
        this.onSubmitAddRating();
    }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getCakesFromService();
        this.newCake = { name: "", url: "" };
        this.newRating = { rating: 0, comment: "" };
    }

    cakeToShow(cake) {
        console.log("Assigning selectedCake:", cake);
        this.selectedCake = cake;
    }

    // list
    getCakesFromService(){
        let observable = this._httpService.getCakes();
        observable.subscribe(data => {
            this.cakes = <Array<any>>data;
            console.log("Got cakes: ", this.cakes.length, this.cakes);
        });
    }

    // C
    onSubmitCreateNewCake() {
        console.log("Creating New Cake ...", this.newCake);

        let observable = this._httpService.postNewCake(this.newCake);
        observable.subscribe(data => {
            console.log("New Cake:", data);
            this.selectedCake = data;
            this.getCakesFromService();
        })

        // Reset this.newCake to a new, clean object.
        this.newCake = { name: "", url: "" }
        console.log("Create Complete!");
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
        console.log("Add Rating to Selected ...", this.selectedCake._id,  this.selectedCake, this.newRating);

        let observable = this._httpService.putARating(this.selectedCake._id, this.newRating);
        observable.subscribe(data => {
            // console.log("Old Data for Updated Cake:", data); //data is old!!!!!!!!!!!
            this.selectedCake = undefined;
            this.getCakesFromService();
        })

        this.newRating = { rating: 0, comment: "" }
        console.log("Update/Add Rating Complete!");
    }

    
}
