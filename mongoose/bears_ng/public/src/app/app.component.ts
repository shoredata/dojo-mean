import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'I MADE THIS, IT IS SUPPOSED TO BE ON FIRE, EVERYTHNG IS FINE, MOVE ALONG CITIZEN';
  constructor(private _httpService: HttpService){}
}
