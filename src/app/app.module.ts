import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdIconModule, MdToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({

  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]

}) export class AppModule { }
