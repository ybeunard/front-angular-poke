import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import "hammerjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdIconModule, MdToolbarModule, MdButtonModule, MdCardModule, MdDialogModule, MdSnackBarModule } from "@angular/material";

import {CoreActionModule} from "./core-action/core-action.module";
import {CoreScenarioModule} from "./core-scenario/core-scenario.module";

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { HeaderComponent } from "./header/header.component";
import {NotFoundComponent} from "./error/not-found.component";
import { ConfirmationDialogComponent } from "./dialog-component/confirmation-dialog/confirmation-dialog.component";
import { CreateModuleDialogComponent } from "./dialog-component/create-module-dialog/create-module-dialog.component";

import { PushNotificationsModule } from "./notification-module/push-notifications.module";

@NgModule({

  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    MdDialogModule,
    MdSnackBarModule,
    ReactiveFormsModule,
    JsonpModule,
    MdButtonModule,
    CoreActionModule,
    CoreScenarioModule,
    PushNotificationsModule,
    AppRoutingModule

  ],
  declarations: [

    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    NotFoundComponent,
    ConfirmationDialogComponent,
    CreateModuleDialogComponent

  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ConfirmationDialogComponent, CreateModuleDialogComponent ]

}) export class AppModule { }
