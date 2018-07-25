import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { PnewComponent } from './pnew/pnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
    { path: 'players/list', component: PlayersComponent },    
    { path: 'players/addplayer', component: PnewComponent },    
    { path: 'status/game/:number', component: PlayerComponent },    
    { path: '', pathMatch: 'full', redirectTo: '/players/list' },  
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
