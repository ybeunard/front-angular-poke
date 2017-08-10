import { Component } from "@angular/core";
import { MdDialogRef, MdSnackBar } from "@angular/material";
import { ModulesService } from "../../service/modules.service";
import { isNullOrUndefined } from "util";

import { Module } from "../../front-ops";

@Component({

  selector: "app-create-module-dialog",
  templateUrl: "./create-module-dialog.component.html",
  styleUrls: ["./create-module-dialog.component.scss"]

}) export class CreateModuleDialogComponent {

  model: Module = { action_list: [], command: "", id: null, label: "" };

  public onSubmit() {

    if(isNullOrUndefined(this.model.id)) {
      this.modulesService.putModule(this.model)
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

      this.modulesService.postModule(this.model)
        .subscribe(() => {

          this.dialogRef.close(true);

        },
        error => {

          this.snackBar.open(error, undefined, {
            duration: 2000,
            extraClasses: ["error"]
          });

        });

    }

  }

  constructor(public dialogRef: MdDialogRef<CreateModuleDialogComponent>,
              private modulesService: ModulesService,
              private snackBar: MdSnackBar) { }

}
