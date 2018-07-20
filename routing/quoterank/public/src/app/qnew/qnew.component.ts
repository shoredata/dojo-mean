import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-qnew',
    templateUrl: './qnew.component.html',
    styleUrls: ['./qnew.component.css']
})
export class QnewComponent implements OnInit {
    @Input() quoteToCreate: any; 
    @Input() thisAuthor: any; 
    @Output() aQuoteCreateEmitter = new EventEmitter();
    @Output() aQuoteCancelCreateEmitter = new EventEmitter();

    tempQuote: any;

    constructor() { }
    ngOnInit() { 
        this.quoteToCreate = { quote: "", votes: 0 };
        this.tempQuote = { quote: "", votes: 0 };
    }

    triggerQuoteCreate(){
        // console.log("CLICK: Create:", this.quoteToCreate);
        this.aQuoteCreateEmitter.emit(this.quoteToCreate);
    }
    cancelQuoteCreate(){
        // console.log("CLICK: Cancel");
        this.aQuoteCancelCreateEmitter.emit();
    }

}
    