import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getList() {
        let arr = [];
        return this._http.get('/api/restaurants');
    }    
    postOne(data) {
        return this._http.post('/api/restaurants/new', data);  
    }    
    getOne(id) {
        return this._http.get('/api/restaurants/' + id);
    }    
    postUpdateReview(id, data) {
        return this._http.post('/api/restaurants/' + id + '/review', data);
    } 
    postUpdateOne(id, data) {
        return this._http.post('/api/restaurants/' + id, data);
    } 
    deleteOne(id) {
        return this._http.delete('/api/restaurants/' + id);
    }   



 }
