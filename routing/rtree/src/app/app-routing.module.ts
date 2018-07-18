import { ProductsComponent } from './products/products.component';
import { PdetailsComponent } from './pdetails/pdetails.component';
import { PsalesComponent } from './psales/psales.component';
import { PbrandsComponent } from './pbrands/pbrands.component';
import { PcategoriesComponent } from './pcategories/pcategories.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RdetailsComponent } from './rdetails/rdetails.component';
import { RauthorsComponent } from './rauthors/rauthors.component';
import { RallComponent } from './rall/rall.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'products', component: ProductsComponent, children: [
        { path: 'details/:id', component: PdetailsComponent, children: [
            { path: 'sales', component: PsalesComponent }]
        },
        { path: 'brand/:brand', component: PbrandsComponent },
        { path: 'category/:cat', component: PcategoriesComponent }]
    },
    { path: 'reviews', component: ReviewsComponent, children: [
        { path: 'details/:id', component: RdetailsComponent },
        { path: 'author/:id', component: RauthorsComponent },
        { path: 'all/:id', component: RallComponent }]
    },
    { path: '', pathMatch: 'full', redirectTo: '/products' },  //main redirect
    // the ** will catch anything that did not match any of the above routes
    { path: '**', component: PagenotfoundComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
