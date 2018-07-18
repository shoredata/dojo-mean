import { Component, OnInit } from '@angular/core';
import { ShintoService } from '../shinto.service';


@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

    selectedTrade: any;
    coins: number = 0;
    trades: any = [];

    constructor(
        private _shintoService: ShintoService
    ) { }

    ngOnInit() {
        this.coins = this._shintoService.getCoins();
        this.trades = this._shintoService.getTrades();
        this.selectedTrade = undefined;
        console.log(this.trades);
    }

    tradeToShow(trade) {
        console.log("Assigning this.selectedTrade:", trade);
        this.selectedTrade = trade;
    }


}