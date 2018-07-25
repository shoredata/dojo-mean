import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { RnewComponent } from './rnew/rnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
    { path: 'movies', component: MoviesComponent },    
    { path: 'movies/:id/review', component: RnewComponent }, 
    { path: 'movies/:id', component: MovieComponent }, 
    { path: '', pathMatch: 'full', redirectTo: '/movies' },  
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
