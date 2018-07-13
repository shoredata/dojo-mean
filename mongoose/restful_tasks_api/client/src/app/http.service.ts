import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient){

    }

    getTasks(){
        // // our http response is an Observable, store it in a variable
        // let tempObservable = this._http.get('/tasks');
        // // subscribe to the Observable and provide the code we would like to do with our data from the response
        // tempObservable.subscribe(data => console.log("Got our tasks!", data));
        return this._http.get('/tasks');
    }    

    getATask(taskId){
        // // our http response is an Observable, store it in a variable
        // let tempObservable = this._http.get('/tasks/' + taskId);
        // // subscribe to the Observable and provide the code we would like to do with our data from the response
        // tempObservable.subscribe(data => console.log("Got our task!", data));
        return this._http.get('/tasks/' + taskId);
    }    

    postToServer(data){
        // use the .post() method of HttpClient
        // num must be an object
        // provide the url of your post route - make sure this is set up in your server!
        return this._http.post('/tasks', data);  
    }    

    postNewTaskToServer(data){
        // use the .post() method of HttpClient
        // num must be an object
        // provide the url of your post route - make sure this is set up in your server!
        return this._http.post('/tasks', data);  
    }    


    addTask(newtask){
        return this._http.post('/task', newtask)
    }
    

}