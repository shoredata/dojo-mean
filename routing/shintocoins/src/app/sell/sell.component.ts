import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';


@Component({
    selector: 'app-sell',
    templateUrl: './sell.component.html',
    styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

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

    doSell() {
        console.log("doSell: newCoins = ", this.newCoins);
        this._shintoService.addTrade("Sell", this.newCoins * -1);
        this.newCoins = 0;
        this.coins = this._shintoService.getCoins();
        this.trades = this._shintoService.getTrades();
    }

}
