import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";
import { NotFoundComponent } from "./error/not-found.component";

const appRoutes: Routes = [

  {

    path: "",
    redirectTo: "",
    pathMatch: "full"

  },
  {

    path: "**",
    component: NotFoundComponent

  }

];

@NgModule({

  imports: [

    RouterModule.forRoot(appRoutes, { preloadingStrategy: SelectivePreloadingStrategy })

  ],
  exports: [ RouterModule ],
  providers: [ SelectivePreloadingStrategy ]

})export class AppRoutingModule { }
