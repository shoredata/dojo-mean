import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AnewComponent } from './anew/anew.component';
import { AeditComponent } from './aedit/aedit.component';
import { AuthorComponent } from './author/author.component';
import { QnewComponent } from './qnew/qnew.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AnewComponent,
    AeditComponent,
    AuthorComponent,
    QnewComponent,
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
