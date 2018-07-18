import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MineComponent } from './mine/mine.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { LedgerComponent } from './ledger/ledger.component';
import { DetailComponent } from './detail/detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MineComponent,
        BuyComponent,
        SellComponent,
        LedgerComponent,
        DetailComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
