import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RlistComponent } from './rlist/rlist.component';
import { RestComponent } from './rest/rest.component';
import { RnewComponent } from './rnew/rnew.component';
import { ReditComponent } from './redit/redit.component';
import { ReviewComponent } from './review/review.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    RlistComponent,
    RestComponent,
    RnewComponent,
    ReditComponent,
    ReviewComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
