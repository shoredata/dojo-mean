import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) { }

    getTasks() {                    //list
        return this._http.get('/api/tasks');
    }    
    postNewTask(taskData) {         //C   //data is JSON of new object, all vars
        return this._http.post('/api/tasks', taskData);  
    }    
    getATask(taskId) {              //R
        return this._http.get('/api/tasks/' + taskId);
    }    
    putATask(taskId, taskData) {    //U
        return this._http.put('/api/tasks/' + taskId, taskData);
    }    
    deleteATask(taskId) {           //D   //returns deleted task JSON
        return this._http.delete('/api/tasks/' + taskId);
    }    


}
