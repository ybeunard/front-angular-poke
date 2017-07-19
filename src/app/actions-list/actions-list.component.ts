import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isNullOrUndefined } from "util";

import { ModulesService } from "../service/modules.service";

import { Action, Module } from "../front-ops";

@Component({

  selector: "app-actions-list",
  templateUrl: "./actions-list.component.html",
  styleUrls: ["./actions-list.component.scss"]

}) export class ActionsListComponent implements OnInit {

  // current list of modules in the component
  listModules: Array<Module>;

  // Error Messages
  errorMessageGetAllModules: string = "";
  errorMessageModuleNotFound: string = "";

  // change visibility of module in param
  changeVisibility(module: Module) {

    module.visibility = !module.visibility;

  }

  // go to the page /actions/module_id/action_id in param
  displayAction(module: Module, action: Action) {

    this.router.navigate(["/actions/", module.id, action.id]);

  }

  // recover id module in the URL if exist and load the module.
  private initCurrentModuleVisibility() {

    this.route.params
      .map((params: Params) => {

        if(params["module"]) {

          return params["module"];

        }

      }).subscribe(
      responseRouter => {

        if (isNullOrUndefined(responseRouter)) {

          return;

        }
        const id: number = parseInt(responseRouter, 10);
        if(!isNaN(id)) {

          const listModuleFindIndex: number = this.listModules.findIndex((listTest: Module) => listTest.id === id);
          if (listModuleFindIndex !== -1) {

            this.listModules[listModuleFindIndex].visibility = true;

          } else {

            this.errorMessageModuleNotFound = "Module ID " + id + " doesn't exists";

          }

        } else {

          this.errorMessageModuleNotFound = "Module ID " + responseRouter + " doesn't exists";

        }

      },
      error => {

        this.errorMessageModuleNotFound = error;

      });

  }

  // load all modules
  loadModules() {

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modulesService: ModulesService) { }

  ngOnInit() {

    this.errorMessageGetAllModules = "";
    this.errorMessageModuleNotFound = "";
    this.loadModules();

  }

}
