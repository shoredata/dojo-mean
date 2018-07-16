import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component'; // <-- import FormsModule.


@NgModule({
    declarations: [
        AppComponent,
        TaskComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule { }


