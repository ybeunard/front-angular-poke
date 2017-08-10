import { Component } from "@angular/core";
import { isNullOrUndefined } from "util";
import { MdDialogRef, MdSnackBar } from "@angular/material";

import { ActionsService } from "../../service/actions.service";

import { Action, Module } from "../../front-ops";

@Component({
  selector: "app-create-action-dialog",
  templateUrl: "./create-action-dialog.component.html",
  styleUrls: ["./create-action-dialog.component.scss"]
})
export class CreateActionDialogComponent {

  model: Action = { category: "", command: "", id: null, label: "", module_id: null };

  modules: Array<Module> = [];

  public onSubmit() {

    if(isNullOrUndefined(this.model.id)) {

      this.actionsService.putAction(this.model)
        .subscribe(() => {

            this.dialogRef.close(true);

          },
          error => {

            this.snackBar.open(error, undefined, {

              duration: 2000,
              extraClasses: ["error"]

            });

          });

    } else {

      this.actionsService.postAction(this.model)
        .subscribe(() => {

            this.dialogRef.close({ action: this.model });

          },
          error => {

            this.snackBar.open(error, undefined, {

              duration: 2000,
              extraClasses: ["error"]

            });

          });

    }

  }

  constructor(public dialogRef: MdDialogRef<CreateActionDialogComponent>,
              private  actionsService: ActionsService,
              private snackBar: MdSnackBar) { }

}
