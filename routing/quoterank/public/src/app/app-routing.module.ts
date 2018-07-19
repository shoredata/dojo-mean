import { AuthorsComponent } from './authors/authors.component';
import { AuthorComponent } from './author/author.component';
import { AeditComponent } from './aedit/aedit.component';
import { AnewComponent } from './anew/anew.component';
import { QnewComponent } from './qnew/qnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
    { path: 'authors', component: AuthorsComponent, children: [
        { path: ':id', component: AuthorComponent, children: [
            { path: 'edit', component: AeditComponent } ,
            { path: 'new', component: QnewComponent }   
        ] },
        { path: 'new', component: AnewComponent }
    ] },
    // main redirect
    { path: '', pathMatch: 'full', redirectTo: '/authors' },  
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
