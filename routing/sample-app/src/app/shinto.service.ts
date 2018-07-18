import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShintoService {

    numbers = [1,2,3,4];

    shareNumbers(){
        return this.numbers;
    }
    addToNumbers(num){
        this.numbers.push(num);
    }
    removeFromNumbers(){
        return this.numbers.pop();
    }

    constructor() { }
}
