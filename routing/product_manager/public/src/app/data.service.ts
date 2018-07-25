import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getList() {
        let arr = [];
        return this._http.get('/api/products');
    }    
    postOne(data) {
        return this._http.post('/api/products/new', data);  
    }    
    getOne(id) {
        return this._http.get('/api/products/' + id);
    }    
    postUpdate(id, data) {
        // console.log("postUpdate:", id, data)
        return this._http.post('/api/products/' + id, data);
    } 
    deleteOne(id) {
        return this._http.delete('/api/products/' + id);
    }   



 }
