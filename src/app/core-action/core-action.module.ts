import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from "@angular/forms";
import { MdButtonModule, MdIconModule, MdMenuModule, MdAutocompleteModule, MdInputModule } from "@angular/material";

import { PipeModule } from "../pipe.module";

import { CoreActionRoutingModule } from "./core-action-routing.module";
import { CoreActionComponent } from "./core-action.component";
import { ActionsListComponent } from "../actions-list/actions-list.component";
import { ActionComponent } from "../action/action.component";
import { UnitTasksListComponent } from "../unit-tasks-list/unit-tasks-list.component";

import { ModulesService } from "../service/modules.service";
import { ActionsService } from "../service/actions.service";

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreActionRoutingModule,
    MdButtonModule,
    MdMenuModule,
    MdIconModule,
    MdInputModule,
    MdAutocompleteModule,
    PipeModule

  ],
  declarations: [

    CoreActionComponent,
    ActionsListComponent,
    ActionComponent,
    UnitTasksListComponent

  ],
  providers: [

    ModulesService,
    ActionsService

  ],
  entryComponents: [ ActionComponent ]
}) export class CoreActionModule { }
