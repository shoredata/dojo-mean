import { PetsComponent } from './pets/pets.component';
import { PetComponent } from './pet/pet.component';
import { PeditComponent } from './pedit/pedit.component';
import { PnewComponent } from './pnew/pnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
    { path: 'pets', component: PetsComponent },    
    { path: 'pets/new', component: PnewComponent },
    { path: 'pets/view/:id', component: PetComponent },
    { path: 'pets/edit/:id', component: PeditComponent },
    // main redirect
    { path: '', pathMatch: 'full', redirectTo: '/pets' },  
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
