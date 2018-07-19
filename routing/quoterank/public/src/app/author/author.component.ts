import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
    @Input() authorToShow: any;
    @Output() aAuthorModifiedEmitter = new EventEmitter();
    
    newQuote: any;

    constructor(private _dataService: DataService){ }

    ngOnInit() {
        this.newQuote = undefined;
    }

    getAuthorData() {
        // console.log("getAuthorData() ...");
        let observable = this._dataService.getAuthor(this.authorToShow._id);
        observable.subscribe(data => {
            this.authorToShow = data;
        })
    }

    createQuote() {
        // console.log("createQuote() ...");
        this.newQuote = { quote:"", votes: 0 };
    }

    quoteCreateFromChild(quoteData){
        // console.log("quoteCreateFromChild:", quoteData);
        let observable = this._dataService.postAddQuote(this.authorToShow._id, quoteData);
        observable.subscribe(data => {
            this.newQuote = undefined;
            this.getAuthorData();
        })
        this.aAuthorModifiedEmitter.emit(); 
    }

    quoteCancelCreateFromChild(){
        // console.log("quoteCancelCreateFromChild:");
        this.newQuote = undefined;
    }



    voteUp(quoteData){
        // console.log("voteUp:", quoteData);
        let observable = this._dataService.upVoteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(data => {
            this.getAuthorData();
        })
        this.aAuthorModifiedEmitter.emit(); 
    }
    voteDown(quoteData){
        // console.log("voteDown:", quoteData);
        let observable = this._dataService.downVoteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(data => {
            this.getAuthorData();
        })
        this.aAuthorModifiedEmitter.emit(); 
    }
    deleteQuote(quoteData){
        // console.log("deleteQuote:", quoteData);
        let observable = this._dataService.deleteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(data => {
            this.getAuthorData();
        })
        this.aAuthorModifiedEmitter.emit(); 
    }



}
