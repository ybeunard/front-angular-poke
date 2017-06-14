import { Component } from "@angular/core";

import { ActionsService } from "../service/actions.service";
import { ModulesService } from "../service/modules.service";

import { Action } from "../front-ops";

@Component({

  selector: "app-actions-list",
  templateUrl: "./actions-list.component.html",
  styleUrls: ["./actions-list.component.scss"]

}) export class ActionsListComponent {

  listActionsSortByModule: Array< { moduleName: String, actions: Action[], visibility: boolean } >;
  errorMessage: string;
  loadActions() {

    this.actionsService
      .getListActionsSortByModule()
      .subscribe(
        response => {

          this.listActionsSortByModule = response;

        },
          error => this.errorMessage = error
      );

  }
  changeVisibility(module: { moduleName: String, actions: Action[], visibility: boolean }) {

    module.visibility = !module.visibility;

  }
  constructor(private actionsService: ActionsService, private modulesService: ModulesService) {

    this.loadActions();

  }

}
