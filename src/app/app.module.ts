import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import "hammerjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdIconModule, MdToolbarModule, MdButtonModule, MdCardModule } from "@angular/material";

import {CoreActionModule} from "./core-action/core-action.module";
import {CoreScenarioModule} from "./core-scenario/core-scenario.module";

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { HeaderComponent } from "./header/header.component";
import {NotFoundComponent} from "./error/not-found.component";

import { PushNotificationsModule } from "./notification-module/push-notifications.module";

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
    MdCardModule,
    JsonpModule,
    MdButtonModule,
    CoreActionModule,
    CoreScenarioModule,
    PushNotificationsModule,
    AppRoutingModule

  ],
  bootstrap: [ AppComponent ]

}) export class AppModule { }
