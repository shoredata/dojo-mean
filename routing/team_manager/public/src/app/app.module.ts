import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataService } from './data.service';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { PeditComponent } from './pedit/pedit.component';
import { PnewComponent } from './pnew/pnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
    declarations: [
        AppComponent,
        PlayersComponent,
        PlayerComponent,
        PeditComponent,
        PnewComponent,
        PagenotfoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
