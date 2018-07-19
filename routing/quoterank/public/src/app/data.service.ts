import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getAuthors() {
        return this._http.get('/api/authors');
    }    
    postNewAuthor(authorData) {
        return this._http.post('/api/authors', authorData);  
    }    
    getAuthor(authorId) {
        return this._http.get('/api/authors/' + authorId);
    }    
    putUpdateAuthor(authorId, authorData) {
        // console.log("putUpdateAuthor:", authorId, authorData)
        return this._http.put('/api/authors/' + authorId, authorData);
    } 
    deleteAuthor(authorId) {
        return this._http.delete('/api/authors/' + authorId);
    }   
    postAddQuote(authorId, requestData) {
        return this._http.post('/api/authors/' + authorId + '/quote', requestData);
    }    
    downVoteQuote(authorId, quoteId) {
        return this._http.put('/api/authors/' + authorId + '/quote/' + quoteId, {});
    }    
    upVoteQuote(authorId, quoteId) {
        return this._http.post('/api/authors/' + authorId + '/quote/' + quoteId, {});
    }    
    deleteQuote(authorId, quoteId) {
        return this._http.delete('/api/authors/' + authorId + '/quote/' + quoteId);
    }    



 }
