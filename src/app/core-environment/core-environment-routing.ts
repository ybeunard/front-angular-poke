import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { CoreEnvironmentComponent } from "./core-environment.component";
import { EnvironmentComponent } from "../environment/environment.component";

const environmentRoutes: Routes = [

  {

    path: "environments",
    component: CoreEnvironmentComponent,
    children: [{

      path: "",
      component: EnvironmentComponent

    }]

  }

];

@NgModule({

  imports: [ RouterModule.forChild(environmentRoutes) ],
  exports: [ RouterModule ]

}) export class CoreEnvironmentRoutingModule { }
