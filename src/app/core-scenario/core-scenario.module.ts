import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreScenarioRoutingModule } from "./core-scenario-routing";
import { CoreScenarioComponent } from "./core-scenario.component";

@NgModule({

  imports: [

    CommonModule,
    CoreScenarioRoutingModule

  ],
  declarations: [ CoreScenarioComponent ]

})export class CoreScenarioModule { }
