import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
    selector: 'app-mine',
    templateUrl: './mine.component.html',
    styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

    newCoins: number;
    coins: number = 0;
    trades: any = [];


    constructor(
        private _shintoService: ShintoService
    ) { }

    ngOnInit() {
        this.coins = this._shintoService.getCoins();
        this.trades = this._shintoService.getTrades();
        this.newCoins = 0;
    }

    doMine() {
        console.log("doMine: newCoins = ", this.newCoins);
        this._shintoService.addTrade("Mine", this.newCoins);
        this.newCoins = 0;
        this.coins = this._shintoService.getCoins();
        this.trades = this._shintoService.getTrades();
    }

}
