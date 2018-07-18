import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})


export class AlphaComponent implements OnInit {

    numbers = [];

    constructor(private _shintoService: ShintoService) { }


    ngOnInit() {
        this.getNumbers();
    }

    getNumbers(){
       this.numbers = this._shintoService.shareNumbers();
    }
    addToNumbers(num){
        this._shintoService.addToNumbers(num);
        // this.getNumbers();
    }
    removeFromNumbers(){
        this._shintoService.removeFromNumbers();
        // this.getNumbers();
    }

    triggerPushIndex() {
        this.addToNumbers(this.numbers.length+1);
    }
    triggerPushTime() {
        this.addToNumbers(Date().toLocaleString());
    }
    triggerPopArray() {
        this.removeFromNumbers();
    }

}
