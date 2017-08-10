import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }   from "@angular/forms";
import { MdButtonModule, MdMenuModule } from "@angular/material";

import { CoreScenarioRoutingModule } from "./core-scenario-routing";
import { PipeModule } from "../pipe.module";

import { CoreScenarioComponent } from "./core-scenario.component";
import { ScenariosListComponent } from "../scenarios-list/scenarios-list.component";
import { ScenarioComponent } from "../scenario/scenario.component";
import { AddScenarioComponent } from "../add-scenario/add-scenario.component";
import { DialogNodeComponent } from "../add-scenario/dialog-node/dialog-node.component";

import { ScenariosService } from "../service/scenarios.service";
import { GraphsService } from "../service/graphs.service";
import { LogsService } from "../service/logs.service";
import { InstancesService } from "../service/instances.service";
@NgModule({

  imports: [

    CommonModule,
    FormsModule,
    CoreScenarioRoutingModule,
    MdButtonModule,
    MdMenuModule,
    PipeModule

  ],
  declarations: [

    CoreScenarioComponent,
    ScenariosListComponent,
    ScenarioComponent,
    AddScenarioComponent,
    DialogNodeComponent

  ],
  providers: [

    ScenariosService,
    GraphsService,
    InstancesService,
    LogsService

  ],
  entryComponents: [ DialogNodeComponent ]

})export class CoreScenarioModule { }
