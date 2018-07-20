import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getPets() {
        return this._http.get('/api/pets');
    }    
    postNewPet(petData) {
        return this._http.post('/api/pets', petData);  
    }    
    getPet(petId) {
        return this._http.get('/api/pets/' + petId);
    }    
    patchUpdatePet(petId, petData) {
        // console.log("putUpdateAuthor:", authorId, authorData)
        return this._http.patch('/api/pets/' + petId, petData);
    } 
    deletePet(petId) {
        return this._http.delete('/api/pets/' + petId);
    }   
    putLikePet(petId) {
        return this._http.put('/api/pets/' + petId, {});
    }    



 }
