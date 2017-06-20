import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdMenuModule} from '@angular/material';

import {CoreActionRoutingModule} from "./core-action-routing.module";
import {CoreActionComponent} from "./core-action.component";
import {ActionsListComponent} from "../actions-list/actions-list.component";
import {ActionComponent} from "../action/action.component";

import {ModulesService} from "../service/modules.service";
import {ActionsService} from "../service/actions.service";

@NgModule({
  imports: [

    CommonModule,
    CoreActionRoutingModule,
    MdButtonModule,
    MdMenuModule

  ],
  declarations: [

    CoreActionComponent,
    ActionsListComponent,
    ActionComponent

  ],
  providers: [

    ModulesService,
    ActionsService

  ]
}) export class CoreActionModule { }
