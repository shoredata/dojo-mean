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

    errors = [];

    isValid: boolean = true; //clear this when the authors are modified in author = need to refresh


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
        this.errors = [];
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
        observable.subscribe(
            data => {
                this.ngOnInit();
            },
            err => {
                console.log("Delete Author Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
    }

    // CHILD METHODS ===========================================================================================

    authorModifiedReloadMsgFromChild(authorId){
        // console.log("RELOAD ALL AUTHORS HERE!!");
    }

    authorClosedMsgFromChild(){
        this.clearLocal();
        this.getAuthorsFromService();
    }


    authorUpdateFromChild(authorData){
        // console.log("authorUpdateFromChild:", authorData);
        let observable = this._dataService.putUpdateAuthor(authorData._id, authorData);
        observable.subscribe(
            data => {
                this.ngOnInit();
            },
            err => {
                console.log("Update Author Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
    }

    authorCancelUpdateFromChild(){
        // console.log("authorCancelUpdateFromChild:");
        this.editedAuthor = undefined;
        this.errors = [];
    }

    authorCreateFromChild(authorData){
        // console.log("authorCreateFromChild:", authorData);
        let observable = this._dataService.postNewAuthor(authorData);
        observable.subscribe(
            data => {
                this.ngOnInit();
            },
            err => {
                console.log("Create Author Error:", err.error.errors);
                // for (var idx=0; idx<err.error.errors.length; idx++) {
                //     console.log("A", idx, err.error.errors[idx]);
                // }
                this.errors = err.error.errors;
            }
        )
    }

    authorCancelCreateFromChild(){
        // console.log("authorCancelCreateFromChild:");
        this.newAuthor = undefined;
        this.errors = [];
    }


    // SERVICE METHODS =========================================================================================

    // list
    getAuthorsFromService(){
        // console.log("getAuthorsFromService() .. ");
        let observable = this._dataService.getAuthors();
        observable.subscribe(data => {
            this.authors = <Array<any>>data;
            this.isValid = true;
            // console.log("Authors: ", this.authors.length, this.authors);
        });
    }

    // toggleValid() {
    //     this.isValid = !this.isValid;
    // }


}


