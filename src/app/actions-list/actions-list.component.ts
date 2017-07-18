import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ModulesService } from "../service/modules.service";

import { Action, Module } from "../front-ops";

@Component({

  selector: "app-actions-list",
  templateUrl: "./actions-list.component.html",
  styleUrls: ["./actions-list.component.scss"]

}) export class ActionsListComponent implements OnInit {

  listModules: Array<Module>;

  // Error Messages
  errorMessageGetAllModules: string = "";
  errorMessageModuleNotFound: string = "";

  loadActions() {

    this.modulesService
      .getAllModules()
      .subscribe(
        response => {

          this.listModules = response;
          this.initCurrentModuleVisibility();

        },
          error => {

          this.errorMessageGetAllModules = error;

      });

  }

  initCurrentModuleVisibility() {

    this.route.params
      .map((params: Params) => {

        if(params["module"]) {

          this.errorMessageModuleNotFound = "";
          return params["module"];

        }

      }).subscribe(
        response => {

          const id: number = parseInt(response, 10);
          if (!isNaN(id)) {

            const indexModule: number = this.listModules.findIndex((list: Module) => list.id === id);
            if (indexModule !== -1) {

              this.listModules[indexModule].visibility = true;

            } else {

              this.errorMessageModuleNotFound = "Module ID " + id + " doesn't exists";

            }

          }

        },
        error => {

          this.errorMessageModuleNotFound = error;

      });

  }

  changeVisibility(module: Module) {

    module.visibility = !module.visibility;

  }

  displayAction(module: Module, action: Action) {

    this.router.navigate(["/actions/", module.id, action.id]);

  }

  constructor(private route: ActivatedRoute, private router: Router, private modulesService: ModulesService) { }

  ngOnInit() {

    this.errorMessageGetAllModules = "";
    this.errorMessageModuleNotFound = "";
    this.loadActions();

  }

}
