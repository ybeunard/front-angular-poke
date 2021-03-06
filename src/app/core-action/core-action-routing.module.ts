import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import { CoreActionComponent } from "./core-action.component";
import { ActionsListComponent } from "../actions-list/actions-list.component";

const actionsRoutes: Routes = [

  {

    path: "actions",
    component: CoreActionComponent,
    children: [{

        path: ":module/:id",
        component: ActionsListComponent

      },
      {
        path: ":module",
        component: ActionsListComponent,
      },
      {

        path: "",
        component: ActionsListComponent

    }]

  }

];

@NgModule({

  imports: [

    RouterModule.forChild(actionsRoutes)

  ],
  exports: [ RouterModule ]

}) export class CoreActionRoutingModule { }
