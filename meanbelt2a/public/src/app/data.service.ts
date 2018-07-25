import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor(private _http: HttpClient) { }

    getMovies() {
        let arr = [];
        return this._http.get('/api/movies');
    }    
    postOneMovie(movieData) {
        return this._http.post('/api/movies/new', movieData);  
    }    
    getMovie(movieId) {
        return this._http.get('/api/movies/' + movieId);
    }    
    postReviewOneMovie(movieId, reviewData) {
        // console.log("postReviewOneMovie:", movieId, reviewData)
        return this._http.post('/api/movies/' + movieId, reviewData);
    } 
    deleteMovie(movieId) {
        return this._http.delete('/api/movies/' + movieId);
    }   
    deleteReview(movieId, reviewId) {
        return this._http.delete('/api/movies/' + movieId + "/reviews/" + reviewId);
    }   



 }
