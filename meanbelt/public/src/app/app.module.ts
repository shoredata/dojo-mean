import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataService } from './data.service';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PetsComponent } from './pets/pets.component';
import { PetComponent } from './pet/pet.component';
import { PeditComponent } from './pedit/pedit.component';
import { PnewComponent } from './pnew/pnew.component';

@NgModule({
    declarations: [
        AppComponent,
        PagenotfoundComponent,
        PetsComponent,
        PetComponent,
        PeditComponent,
        PnewComponent
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

