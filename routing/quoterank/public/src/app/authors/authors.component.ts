import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthorComponent } from '../author/author.component';

@Component({
    selector: 'app-root',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

    authors = [];
    newAuthor: any;
    selectedAuthor: any;
    editedAuthor: any;

    constructor(private _dataService: DataService){ }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getAuthorsFromService();
        this.clearLocal();
    }
    clearLocal() {
        this.newAuthor = undefined;
        this.selectedAuthor = undefined;
        this.editedAuthor = undefined;
    }

    // LOCAL FORM EVENTS ==================================================================================

    authorToShow(author) {
        // console.log("authorToShow() ... Assigning selectedAuthor:", author);
        this.clearLocal();
        this.selectedAuthor = author;
    }

    authorToEdit(author) {
        // console.log("authorToEdit() ... Assigning editedAuthor:", author);
        this.clearLocal();
        this.editedAuthor = author;
    }

    createAuthor() {
        // console.log("createAuthor() ...");
        this.clearLocal();
        this.newAuthor = { name:"", quotes:[] };
    }

    authorToDelete(author) {
        // console.log("authorToDelete() .. Deleting Author: ", author);
        let observable = this._dataService.deleteAuthor(author._id);
        observable.subscribe(data => {
            this.ngOnInit();
        })
    }

    // CHILD METHODS ===========================================================================================

    authorModifiedReloadMsgFromChild(authorId){
        // console.log("RELOAD ALL AUTHORS HERE!!");
    }


    authorUpdateFromChild(authorData){
        // console.log("authorUpdateFromChild:", authorData);
        let observable = this._dataService.putUpdateAuthor(authorData._id, authorData);
        observable.subscribe(data => {
            this.ngOnInit();
        })
    }

    authorCancelUpdateFromChild(){
        // console.log("authorCancelUpdateFromChild:");
        this.editedAuthor = undefined;
    }

    authorCreateFromChild(authorData){
        // console.log("authorCreateFromChild:", authorData);
        let observable = this._dataService.postNewAuthor(authorData);
        observable.subscribe(data => {
            this.ngOnInit();
        })
    }

    authorCancelCreateFromChild(){
        // console.log("authorCancelCreateFromChild:");
        this.newAuthor = undefined;
    }


    // SERVICE METHODS =========================================================================================

    // list
    getAuthorsFromService(){
        // console.log("getAuthorsFromService() .. ");
        let observable = this._dataService.getAuthors();
        observable.subscribe(data => {
            this.authors = <Array<any>>data;
            console.log("Authors: ", this.authors.length, this.authors);
        });
    }


}
