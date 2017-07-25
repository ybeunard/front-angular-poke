import {
  Component, OnInit, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { MdDialog, MdDialogRef, MdSnackBar } from "@angular/material";

import { ModulesService } from "../service/modules.service";

import { ActionComponent } from "../action/action.component";
import { ConfirmationDialogComponent } from "../dialog-component/confirmation-dialog/confirmation-dialog.component";

import { Action, Module } from "../front-ops";
import { CreateModuleDialogComponent } from "../dialog-component/create-module-dialog/create-module-dialog.component";

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

  private confirmationDialogRef: MdDialogRef<ConfirmationDialogComponent>;
  private createDialogRef: MdDialogRef<CreateModuleDialogComponent>;

  // current list of modules in the component
  listModules: Array<Module> = [];

  // Error Messages
  errorMessageGetAllModules: string = "";
  errorMessageDeleteModules: string = "";

  // Warning Messages
  warningMessageModuleNotFound: string = "";
  warningMessageNoContentModule: string = "";
  warningMessageActionNotFound: string = "";

  // change visibility of module in param
  public changeVisibility(module: Module) {

    module.visibility = !module.visibility;

  }

  // create one module
  public createModule() {

    this.createDialogRef = this.dialog.open(CreateModuleDialogComponent, { disableClose: false });
    this.createDialogRef.afterClosed().subscribe(response => {
      if(response) {

        this.snackBar.open("Module Created", undefined, {
          duration: 2000,
          extraClasses: ["success"]
        });
        this.router.navigate(["/actions/"]);
        this.loadModules(false);

      }
      this.confirmationDialogRef = null;

    });

  }

  // delete one module in params
  public deleteModule(module: Module) {

    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: false });
    this.confirmationDialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this module?";
    if(module.actions.length !== 0) {

      this.confirmationDialogRef.componentInstance.warningMessage = "Warning: This module contains " + module.actions.length + " actions!!!";

    }
    this.confirmationDialogRef.afterClosed().subscribe(response => {
      if(response) {

        this.modulesService.deleteModule(module.id)
          .subscribe(() => {

            this.snackBar.open("Module Deleted", undefined, {
              duration: 2000,
              extraClasses: ["success"]
            });
            this.router.navigate(["/actions/"]);
            this.loadModules(false);

          },
          error => {

            this.snackBar.open(error, undefined, {
              duration: 2000,
              extraClasses: ["error"]
            });

        });

      }
      this.confirmationDialogRef = null;

    });

  }

  // go to the page /actions/module_id/action_id in param
  public displayAction(module: Module, action: Action) {

    this.router.navigate(["/actions/", module.id, action.id]);

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

  // recover id module in the URL if exist and load the module.
  private initCurrentModuleVisibility(routerModuleId: string): number  {

    const id: number = parseInt(routerModuleId, 10);
    if(!isNaN(id)) {

      const listModuleFindIndex: number = this.listModules.findIndex((listTest: Module) => listTest.id === id);
      if (listModuleFindIndex !== -1) {

        this.listModules[listModuleFindIndex].visibility = true;
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

        const actionFindIndex: number = this.listModules[moduleIndex].actions.findIndex((actionTest: Action) => actionTest.id === id);
        if (actionFindIndex !== -1) {

          setTimeout(() => {

            this.loadAction(this.listModules[moduleIndex].actions[actionFindIndex]);
            if(!this.firstLoading) {

              this.scroll(this.listModules[moduleIndex].actions[actionFindIndex].id);
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
  private loadAction(action: Action) {

    let actionAnchorFind: ViewContainerRef = this.actionAnchorList.find((actionAnchorTest: ViewContainerRef) => {

      return actionAnchorTest.element.nativeElement.id === "action_" + action.id;

    });
    if(isNullOrUndefined(actionAnchorFind)) { return; }
    if(this.currentActionAnchor) { this.currentActionAnchor.clear(); }
    this.currentActionAnchor = actionAnchorFind;
    const actionComponentFactory: any = this.componentFactoryResolver.resolveComponentFactory(ActionComponent);
    this.actionComponentRef = this.currentActionAnchor.createComponent(actionComponentFactory);
    this.actionComponentRef.instance.action = action;

  }

  // load all modules
  private loadModules(needRecoverParams: boolean) {

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

          }

        },
          error => {

          this.errorMessageGetAllModules = error;

      });

  }

  private scroll(actionId: number) {

    if(document.getElementById("action_" + actionId)) {

      const container: any = document.getElementsByClassName("list-module");
      container[0].scrollTop = document.getElementById("action_" + actionId).offsetTop - container[0].offsetHeight / 2;

    }

  }

  public updateModule(module: Module) {

    this.createDialogRef = this.dialog.open(CreateModuleDialogComponent, { disableClose: false });
    this.createDialogRef.componentInstance.id = module.id;
    this.createDialogRef.componentInstance.label = module.label;
    this.createDialogRef.componentInstance.command = module.command;
    this.createDialogRef.afterClosed().subscribe(response => {
      if(response) {

        this.snackBar.open("Module Updated", undefined, {
          duration: 2000,
          extraClasses: ["success"]
        });
        this.loadModules(false);

      }
      this.confirmationDialogRef = null;

    });

  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modulesService: ModulesService,
              private componentFactoryResolver: ComponentFactoryResolver,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.errorMessageGetAllModules = "";
    this.errorMessageDeleteModules = "";
    this.warningMessageModuleNotFound = "";
    this.warningMessageActionNotFound = "";
    this.warningMessageNoContentModule = "";

  }

  ngAfterViewInit() {

    this.loadModules(true);

  }

}
