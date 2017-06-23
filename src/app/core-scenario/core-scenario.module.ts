import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MdButtonModule, MdMenuModule} from "@angular/material";

import { CoreScenarioRoutingModule } from "./core-scenario-routing";
import { CoreScenarioComponent } from "./core-scenario.component";
import { ScenariosListComponent } from "../scenarios-list/scenarios-list.component";
import { ScenarioComponent } from './scenario/scenario.component';

import {ScenariosService} from "../service/scenarios.service";
import {TaskService} from '../service/tasks.service';

@NgModule({

  imports: [

    CommonModule,
    CoreScenarioRoutingModule,
    MdButtonModule,
    MdMenuModule

  ],
  declarations: [

    CoreScenarioComponent,
    ScenariosListComponent,
    ScenarioComponent

  ],
  providers: [

    ScenariosService,
    TaskService

  ]

})export class CoreScenarioModule { }
