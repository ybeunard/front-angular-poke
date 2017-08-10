import { NgModule } from "@angular/core";
import { MdButtonModule, MdIconModule, MdMenuModule, MdTabsModule } from "@angular/material";
import { CommonModule } from "@angular/common";

import { CoreEnvironmentRoutingModule } from "./core-environment-routing";

import { EnvironmentsService } from "../service/environments.service";

import { CoreEnvironmentComponent } from "./core-environment.component";
import { EnvironmentComponent } from "../environment/environment.component";

@NgModule({

  imports: [

    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdTabsModule,
    CoreEnvironmentRoutingModule

  ],
  declarations: [

    CoreEnvironmentComponent,
    EnvironmentComponent

  ],
  providers: [

    EnvironmentsService

  ]

})export class CoreEnvironmentModule { }
