import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getPlayers() {
        let arr = [];
        return this._http.get('/api/players');
    }    
    postPlayer(playerData) {
        return this._http.post('/api/players/new', playerData);  
    }    
    getPlayer(playerId) {
        return this._http.get('/api/players/' + playerId);
    }    
    postGameUpdate(playerId, playerData) {
        // console.log("postReviewOneMovie:", movieId, reviewData)
        return this._http.post('/api/players/' + playerId, playerData);
    } 
    deletePlayer(playerId) {
        return this._http.delete('/api/players/' + playerId);
    }   



 }
