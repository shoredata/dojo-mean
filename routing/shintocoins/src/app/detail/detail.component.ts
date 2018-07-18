import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    @Input() tradeToShow: any;

    constructor() { }

    ngOnInit() {
        console.log("ngOnInt ........................................................");
    }

}
