// import { AppComponent } from './app.component';
import { RestComponent } from './rest/rest.component';
import { RitemsComponent } from './ritems/ritems.component';
import { RnewComponent } from './rnew/rnew.component';
import { RlistComponent } from './rlist/rlist.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
    { path: 'restaurants/:id/items', component: RitemsComponent },    
    { path: 'restaurants/new', component: RnewComponent },    
    { path: 'restaurants/:id', component: RestComponent },    
    { path: 'restaurants', component: RlistComponent },    
    { path: '', pathMatch: 'full', redirectTo: '/restaurants' },  
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
