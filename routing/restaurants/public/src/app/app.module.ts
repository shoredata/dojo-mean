import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { RlistComponent } from './rlist/rlist.component';
import { RestComponent } from './rest/rest.component';
import { RnewComponent } from './rnew/rnew.component';
import { RitemsComponent } from './ritems/ritems.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
    declarations: [
        AppComponent,
        RlistComponent,
        RestComponent,
        RnewComponent,
        RitemsComponent,
        PagenotfoundComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
