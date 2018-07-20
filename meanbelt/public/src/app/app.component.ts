import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { PetsComponent } from './pets/pets.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private _dataService: DataService){ }

    ngOnInit() {
        
    }


}
