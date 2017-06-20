import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import {  CoreScenarioComponent } from "./core-scenario.component";

const scenariosRoutes: Routes = [

  {

    path: "scenarios",
    component: CoreScenarioComponent

  }

];

@NgModule({

  imports: [ RouterModule.forChild(scenariosRoutes) ],
  exports: [ RouterModule ]

}) export class CoreScenarioRoutingModule { }
