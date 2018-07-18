import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

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

    doBuy() {
        console.log("doBuy: newCoins = ", this.newCoins);
        this._shintoService.addTrade("Buy", this.newCoins);
        this.newCoins = 0;
        this.coins = this._shintoService.getCoins();
        this.trades = this._shintoService.getTrades();
    }

}
