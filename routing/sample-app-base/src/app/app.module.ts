import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentNameComponent } from './component-name/component-name.component';

import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { GammaComponent } from './gamma/gamma.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
    declarations: [
        AppComponent,
        ComponentNameComponent,
        AlphaComponent, BetaComponent, GammaComponent, PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
