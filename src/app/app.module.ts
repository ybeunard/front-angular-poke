import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import "hammerjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdIconModule, MdToolbarModule, MdButtonModule } from "@angular/material";

import {CoreActionModule} from './core-action/core-action.module';

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { HeaderComponent } from "./header/header.component";
import {NotFoundComponent} from "./error/not-found.component";

@NgModule({

  declarations: [

    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    NotFoundComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdToolbarModule,
    JsonpModule,
    MdButtonModule,
    CoreActionModule,
    AppRoutingModule

  ],
  bootstrap: [ AppComponent ]

}) export class AppModule { }
