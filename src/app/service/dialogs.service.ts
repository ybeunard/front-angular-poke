import { Injectable } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";
import { Observable } from "rxjs/Observable";

import { ConfirmationDialogComponent } from "../dialog-component/confirmation-dialog/confirmation-dialog.component";
import { CreateModuleDialogComponent } from "../dialog-component/create-module-dialog/create-module-dialog.component";
import { CreateActionDialogComponent } from "../dialog-component/create-action-dialog/create-action-dialog.component";

import { Action, Module } from "../front-ops";
import { isNullOrUndefined } from "util";

@Injectable()
export class DialogsService {

  private confirmationDialogRef: MdDialogRef<ConfirmationDialogComponent>;
  private createActionDialogRef: MdDialogRef<CreateActionDialogComponent>;
  private createModuleDialogRef: MdDialogRef<CreateModuleDialogComponent>;

  public confirmationDialog(message: string, warningMessage: string): Observable<any> {

    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: false });
    this.confirmationDialogRef.componentInstance.confirmMessage = message;
    if(!isNullOrUndefined(warningMessage)) {

      this.confirmationDialogRef.componentInstance.warningMessage = warningMessage;

    }
    return this.confirmationDialogRef.afterClosed().map(response => {

      this.confirmationDialogRef = null;
      return response;

    });

  }

  public createActionDialog(model: Action, moduleId: number, modules: Array<Module>): Observable<any> {

    this.createActionDialogRef = this.dialog.open(CreateActionDialogComponent, { disableClose: false });
    this.createActionDialogRef.componentInstance.modules = modules;
    if(!isNullOrUndefined(model) && isNullOrUndefined(moduleId)) {

      this.createActionDialogRef.componentInstance.model = { ...model };
      this.createActionDialogRef.componentInstance.module_action = moduleId;

    }
    return this.createActionDialogRef.afterClosed().map(response => {

      this.createActionDialogRef = null;
      return response;

    });

  }

  public createModuleDialog(module: Module): Observable<any> {

    this.createModuleDialogRef = this.dialog.open(CreateModuleDialogComponent, { disableClose: false });
    if(!isNullOrUndefined(module)) {

      this.createModuleDialogRef.componentInstance.model = { ...module };

    }
    return this.createModuleDialogRef.afterClosed().map(response => {

      this.createModuleDialogRef = null;
      return response;

    });

  }

  constructor(private dialog: MdDialog) { }

}
