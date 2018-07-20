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
    @Output() aCloseAuthorDisplayEmmitter = new EventEmitter();
    
    newQuote: any;
    errors = [];

    constructor(private _dataService: DataService){ }

    ngOnInit() {
        this.clearLocal();
    }

    clearLocal(){
        this.newQuote = undefined;
        this.errors = [];
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
        observable.subscribe(
            data => {
                this.clearLocal();
                this.getAuthorData();
            },
            err => {
                console.log("Create Quote Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
        this.aAuthorModifiedEmitter.emit(); 
    }

    quoteCancelCreateFromChild(){
        // console.log("quoteCancelCreateFromChild:");
        this.clearLocal();
    }

    closeAuthorDisplay() {
        this.aCloseAuthorDisplayEmmitter.emit(); 
    }



    voteUp(quoteData){
        // console.log("voteUp:", quoteData);
        let observable = this._dataService.upVoteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(
            data => {
                this.clearLocal();
                this.getAuthorData();
            },
            err => {
                console.log("Vote Up Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
        this.aAuthorModifiedEmitter.emit(); 
    }
    voteDown(quoteData){
        // console.log("voteDown:", quoteData);
        let observable = this._dataService.downVoteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(
            data => {
                this.clearLocal();
                this.getAuthorData();
            },
            err => {
                console.log("Vote Down Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
        this.aAuthorModifiedEmitter.emit(); 
    }
    deleteQuote(quoteData){
        // console.log("deleteQuote:", quoteData);
        let observable = this._dataService.deleteQuote(this.authorToShow._id, quoteData._id);
        observable.subscribe(
            data => {
                this.clearLocal();
                this.getAuthorData();
            },
            err => {
                console.log("Delete Quote Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
        this.aAuthorModifiedEmitter.emit(); 
    }



}
