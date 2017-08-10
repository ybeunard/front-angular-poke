import {

  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewEncapsulation

} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { MdSnackBar } from "@angular/material";

import { ModulesService } from "../service/modules.service";
import { ActionsService } from "../service/actions.service";
import { DialogsService } from "../service/dialogs.service";

import { ActionComponent } from "../action/action.component";

import { Action, Module } from "../front-ops";

@Component({

  selector: "app-actions-list",
  templateUrl: "./actions-list.component.html",
  styleUrls: ["./actions-list.component.scss"],
  encapsulation: ViewEncapsulation.None

}) export class ActionsListComponent implements OnInit, AfterViewInit  {

  @ViewChildren("actionAnchor", { read: ViewContainerRef })
  protected actionAnchorList: QueryList<ViewContainerRef>;

  private currentActionAnchor: ViewContainerRef = null;
  private actionComponentRef: any;

  private firstLoading: boolean;

  actionId: number = null;

  // current list of modules in the component
  listModules: Array<Module> = [];

  filter: string = "";

  // Error Messages
  errorMessageGetAllModules: string = "";
  errorMessageDeleteModules: string = "";

  // Warning Messages
  warningMessageModuleNotFound: string = "";
  warningMessageNoContentModule: string = "";
  warningMessageActionNotFound: string = "";

  // change visibility of module in param
  public changeVisibility(module: Module) {

    return;

  }

  // create one action
  public createAction() {

    this.dialogsService.createActionDialog(null, this.listModules).subscribe(response => {

      if(response) {

        this.snackBar.open("Action Created", undefined, {

          duration: 2000,
          extraClasses: ["success"]

        });
        this.loadModules(false, "/actions/");

      }

    });

  }

  // create one module
  public createModule() {

    this.dialogsService.createModuleDialog(null).subscribe(response => {

      if(response) {

        this.snackBar.open("Module Created", undefined, {

          duration: 2000,
          extraClasses: ["success"]

        });
        this.loadModules(false, "/actions/");

      }

    });

  }

  // delete one action in params
  public deleteAction(action: Action) {

    this.dialogsService.confirmationDialog("Are you sure you want to delete this action?", null).subscribe(response => {
      if(response) {

        this.actionsService.deleteAction(action.id)
          .subscribe(() => {

              this.snackBar.open("Action Deleted", undefined, {
                duration: 2000,
                extraClasses: ["success"]
              });
              this.loadModules(false, "/actions/");

            },
            error => {

              this.snackBar.open(error, undefined, {
                duration: 2000,
                extraClasses: ["error"]
              });

            });

      }

    });

  }

  // delete one module in params
  public deleteModule(module: Module) {

    const warning: string = module.action_list.length !== 0 ? "Warning: This module contains " + module.action_list.length + " actions!!!" : null;
    this.dialogsService.confirmationDialog("Are you sure you want to delete this module?", warning).subscribe(response => {
      if(response) {

        this.modulesService.deleteModule(module.id)
          .subscribe(() => {

            this.snackBar.open("Module Deleted", undefined, {
              duration: 2000,
              extraClasses: ["success"]
            });
            this.loadModules(false, "/actions/");

          },
          error => {

            this.snackBar.open(error, undefined, {
              duration: 2000,
              extraClasses: ["error"]
            });

        });

      }

    });

  }

  // go to the page /actions/module_id/action_id in param
  public displayAction(module: Module, action: Action) {

    this.router.navigate(["/actions/", module.id, action.id]);

  }

  // recover id module in the URL if exist and load the module.
  private initCurrentModuleVisibility(routerModuleId: string): number  {

    const id: number = parseInt(routerModuleId, 10);
    if(!isNaN(id)) {

      const listModuleFindIndex: number = this.listModules.findIndex((listTest: Module) => listTest.id === id);
      if (listModuleFindIndex !== -1) {

        return listModuleFindIndex;

      } else {

        this.warningMessageModuleNotFound = "Module ID " + id + " doesn't exists";

      }

    } else {

      this.warningMessageModuleNotFound = "Module ID " + routerModuleId + " doesn't exists";

    }
    return null;

  }

  // recover id action in the URL if exist and load the action.
  private initCurrentAction(routerActionId: string, moduleIndex: number) {

    const id: number = parseInt(routerActionId, 10);
    if(!isNaN(id)) {

      this.warningMessageActionNotFound = "";

        const actionFindIndex: number = this.listModules[moduleIndex].action_list.findIndex((actionTest: Action) => actionTest.id === id);
        if (actionFindIndex !== -1) {

          setTimeout(() => {

            this.loadAction(this.listModules[moduleIndex].action_list[actionFindIndex], this.listModules[moduleIndex].command);
            if(!this.firstLoading) {

              this.scroll(this.listModules[moduleIndex].action_list[actionFindIndex].id);
              this.firstLoading = true;

            }

          }, 0);

        } else {

          this.warningMessageActionNotFound = "Action ID " + id + " doesn't exists in module " + this.listModules[moduleIndex].label;

        }

    } else {

      this.warningMessageActionNotFound = "Action ID " + routerActionId + " doesn't exists in module " + this.listModules[moduleIndex].label;

    }

  }

  // load ActionComponent with the action in param
  private loadAction(action: Action, moduleCommand: string) {

    let actionAnchorFind: ViewContainerRef = this.actionAnchorList.find((actionAnchorTest: ViewContainerRef) => {

      return actionAnchorTest.element.nativeElement.id === "action_" + action.id;

    });
    if(isNullOrUndefined(actionAnchorFind)) { return; }
    if(this.currentActionAnchor) { this.currentActionAnchor.clear(); }
    this.currentActionAnchor = actionAnchorFind;
    const actionComponentFactory: any = this.componentFactoryResolver.resolveComponentFactory(ActionComponent);
    this.actionComponentRef = this.currentActionAnchor.createComponent(actionComponentFactory);
    this.actionComponentRef.instance.action = action;
    this.actionComponentRef.instance.moduleCommand = moduleCommand;
    this.actionId = action.id;

  }

  // load all modules
  private loadModules(needRecoverParams: boolean, navigate: string) {

    this.modulesService
      .getAllModules()
      .subscribe(
        response => {

          if(response.length === 0) {

            this.warningMessageNoContentModule = "No module in the database";

          }
          this.listModules = response;
          if(needRecoverParams) {

            this.recoverParamsRouter();

          } else {

            this.router.navigate([navigate]);

          }

        },
        error => {

          this.errorMessageGetAllModules = error;

    });

  }

  private recoverParamsRouter() {

    this.route.params
      .subscribe(
        responseRouter => {

          if (responseRouter["module"]) {

            const moduleIndex: number = this.initCurrentModuleVisibility(responseRouter["module"]);
            if(!isNullOrUndefined(moduleIndex) && responseRouter["id"]) {

              this.initCurrentAction(responseRouter["id"], moduleIndex);

            }

          }

        },
        error => {

          this.warningMessageModuleNotFound = error;

        });

  }

  private scroll(actionId: number) {

    if(document.getElementById("action_" + actionId)) {

      const container: any = document.getElementsByClassName("list-module");
      container[0].scrollTop = document.getElementById("action_" + actionId).offsetTop - container[0].offsetHeight / 2;

    }

  }

  // update one action in params
  public updateAction(action: Action, module: Module) {

    this.dialogsService.createActionDialog(action, this.listModules).subscribe(response => {

      if(response) {

        this.snackBar.open("Action Updated", undefined, {

          duration: 2000,
          extraClasses: ["success"]

        });
        this.loadModules(false, "/actions/" + response.idModule + "/" + response.idAction);

      }

    });

  }

  // update one module in params
  public updateModule(module: Module) {

    this.dialogsService.createModuleDialog(module).subscribe(response => {

      if(response) {

        this.snackBar.open("Module Updated", undefined, {

          duration: 2000,
          extraClasses: ["success"]

        });
        this.loadModules(false, "/actions/");

      }

    });

  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modulesService: ModulesService,
              private actionsService: ActionsService,
              private dialogsService: DialogsService,
              private componentFactoryResolver: ComponentFactoryResolver,
              public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.errorMessageGetAllModules = "";
    this.errorMessageDeleteModules = "";
    this.warningMessageModuleNotFound = "";
    this.warningMessageActionNotFound = "";
    this.warningMessageNoContentModule = "";

  }

  ngAfterViewInit() {

    this.loadModules(true, "");

  }

}
