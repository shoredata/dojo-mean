import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { PdetailsComponent } from './pdetails/pdetails.component';
import { PbrandsComponent } from './pbrands/pbrands.component';
import { PcategoriesComponent } from './pcategories/pcategories.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RdetailsComponent } from './rdetails/rdetails.component';
import { RauthorsComponent } from './rauthors/rauthors.component';
import { RallComponent } from './rall/rall.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PsalesComponent } from './psales/psales.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PdetailsComponent,
    PbrandsComponent,
    PcategoriesComponent,
    ReviewsComponent,
    RdetailsComponent,
    RauthorsComponent,
    RallComponent,
    PagenotfoundComponent,
    PsalesComponent
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
