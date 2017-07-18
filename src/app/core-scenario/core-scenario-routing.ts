import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import {  CoreScenarioComponent } from "./core-scenario.component";
import { ScenariosListComponent } from "../scenarios-list/scenarios-list.component";
import { ScenarioComponent } from "../scenario/scenario.component";
import { AddScenarioComponent } from "../add-scenario/add-scenario.component";

const scenariosRoutes: Routes = [

  {

    path: "scenarios",
    component: CoreScenarioComponent,
    children: [{

        path: "add",
        component: AddScenarioComponent

      },
      {

        path: ":id/update",
        component: AddScenarioComponent

      },
      {

        path: "",
        component: ScenariosListComponent,
        children: [{

          path: ":id",
          component: ScenarioComponent

        }]

      }]

  }

];

@NgModule({

  imports: [ RouterModule.forChild(scenariosRoutes) ],
  exports: [ RouterModule ]

}) export class CoreScenarioRoutingModule { }
