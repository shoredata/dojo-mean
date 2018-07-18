import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShintoService {
    coins: number = 0;
    trades: any = [ ];

    constructor() { }

    getCoins(){
        return this.coins;
    }
    getTrades(){
        return this.trades;
    }
    addTrade(action: string, modifier: number){        
        let count: number = 0;
        let total: number = this.coins;
        count = +modifier;
        total = +modifier + this.coins;
        let trade = {
            action: <string>action, 
            value: <number>count,
            total: <number>total,
            date: <string>Date().toLocaleString()
        };
        console.log(this.coins, trade);
        this.trades.unshift(trade);
        this.coins = total;
        return trade;
    }

}
