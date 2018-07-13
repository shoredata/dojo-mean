import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'HELLO THIS IS IN CLIENT/SRC/APP/APP.COMPONENT.TS';
    constructor(private _httpService: HttpService) { 
        
    }

}
