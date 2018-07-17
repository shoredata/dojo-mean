import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) { }

    getCakes() {                    //list
        return this._http.get('/api/cakes');
    }    
    postNewCake(cakeData) {         //C   
        return this._http.post('/api/cakes', cakeData);  
    }    
    getACake(cakeId) {              //R
        return this._http.get('/api/cakes/' + cakeId);
    }    
    putARating(cakeId, requestData) {    //U add rating
        return this._http.put('/api/cakes/' + cakeId, requestData);
    }    


}
