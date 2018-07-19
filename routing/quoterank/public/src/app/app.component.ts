import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AuthorsComponent } from './authors/authors.component';

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
