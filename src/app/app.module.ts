import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import "hammerjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MdMenuModule, MdIconModule, MdToolbarModule, MdButtonModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { HeaderComponent } from "./header/header.component";
import { ActionsListComponent } from "./actions-list/actions-list.component";

import { ModulesService } from "./service/modules.service";
import { ActionsService } from "./service/actions.service";

@NgModule({

  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    ActionsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdToolbarModule,
    MdMenuModule,
    JsonpModule,
    MdButtonModule
  ],
  providers: [
    ModulesService,
    ActionsService
  ],
  bootstrap: [ AppComponent ]

}) export class AppModule { }
