import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getPets() {
        let arr = [];
        return this._http.get('/api/pets');
    }    
    postNewPet(petData) {
        // console.log("postNewPet:", petData);
        return this._http.post('/api/pets', petData);  
    }    
    postNewPetV2(petData) {
        // console.log("postNewPet:", petData);
        return this._http.post('/api/pets/new', petData);  
    }    
    getPet(petId) {
        return this._http.get('/api/pets/' + petId);
    }    
    patchUpdatePet(petId, petData) {
        // console.log("putUpdateAuthor:", authorId, authorData)
        return this._http.patch('/api/pets/' + petId, petData);
    } 
    postUpdatePetV2(petId, petData) {
        // console.log("putUpdateAuthor:", authorId, authorData)
        return this._http.post('/api/pets/' + petId, petData);
    } 
    deletePet(petId) {
        return this._http.delete('/api/pets/' + petId);
    }   
    putLikePet(petId) {
        return this._http.put('/api/pets/' + petId, {});
    }    



 }
