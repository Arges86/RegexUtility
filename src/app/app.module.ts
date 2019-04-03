import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatMenuModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSliderModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegEx2StringComponent } from './reg-ex2-string/reg-ex2-string.component';
import { RegexTesterComponent } from './regex-tester/regex-tester.component';

import { Utils } from './services/utils.component';
import { Rest } from './services/rest.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegEx2StringComponent,
    RegexTesterComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    AppRoutingModule
  ],
  providers: [
    Utils,
    Rest
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
