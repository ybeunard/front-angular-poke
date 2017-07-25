import { Component } from "@angular/core";
import { MdDialogRef, MdSnackBar } from "@angular/material";
import { ModulesService } from "../../service/modules.service";
import { isNullOrUndefined } from "util";

@Component({

  selector: "app-create-module-dialog",
  templateUrl: "./create-module-dialog.component.html",
  styleUrls: ["./create-module-dialog.component.scss"]

}) export class CreateModuleDialogComponent {

  id: number = null;
  label: string = "";
  command: string = "";

  public onSubmit() {

    if(isNullOrUndefined(this.id)) {
      this.modulesService.putModules(this.label, this.command)
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

      this.modulesService.postModules(this.id, this.label, this.command)
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
