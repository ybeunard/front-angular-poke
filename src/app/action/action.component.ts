import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { isUndefined } from "util";

import { ActionsService } from "../service/actions.service";

import { Action } from "../front-ops";

@Component({

  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]

}) export class ActionComponent implements OnInit {

  action: Action;

  // string to stock args to run the action with it.
  args: string = "";

  // string to display the action execution return.
  consoleReturn: string = "";

  // Error Messages
  errorMessageGetAction: string = "";
  errorMessageActionIdIncorrect: string = "";

  // recover id action in the URL and load the action.
  loadAction() {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          this.errorMessageActionIdIncorrect = "";
          return params["id"];

        }

      }).subscribe(
      responseRouter => {

        const id: number = parseInt(responseRouter, 10);
        if (!isUndefined(id) && !isNaN(id)) {

          this.actionsService
            .getAction(id)
            .subscribe(
              response => {

                this.action = response;
                this.args = "";
                this.consoleReturn = "";

              },
              error => {

                this.errorMessageGetAction = error;

              });

        } else {

          this.errorMessageActionIdIncorrect = "Action ID " + id + " doesn't exists";

        }

      },
      error => {

        this.errorMessageActionIdIncorrect = error;

      });

  }

  runAction(action: number) {

    this.actionsService.executeAction(action, this.args)
      .subscribe(
        response => {

          this.consoleReturn = response;

        },
        error => {

          this.consoleReturn = error;

      });

  }

  public get _consoleReturn() : SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(this.consoleReturn);

  }

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private actionsService: ActionsService) { }

  ngOnInit() {

    this.errorMessageGetAction = "";
    this.errorMessageActionIdIncorrect = "";
    this.loadAction();

  }

}
