import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient){
        this.getTasks();
        this.getATask();
    }

    getTasks(){
        // our http response is an Observable, store it in a variable
        let tempObservable = this._http.get('/tasks');
        // subscribe to the Observable and provide the code we would like to do with our data from the response
        tempObservable.subscribe(data => console.log("Got our tasks!", data));
    }    

    getATask(){
        // our http response is an Observable, store it in a variable
        let tempObservable = this._http.get('/tasks/5b47e147836800a50654a6a9');
        // subscribe to the Observable and provide the code we would like to do with our data from the response
        tempObservable.subscribe(data => console.log("Got our tasks!", data));
    }    

}