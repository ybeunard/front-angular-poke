import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ActionsService } from "../service/actions.service";

import { Action } from "../front-ops";

@Component({

  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]

}) export class ActionComponent {

  // current action in the component
  action: Action;

  // string to stock args to run the action with it.
  args: string = "";

  // string to display the action execution return.
  consoleReturn: string = "";

  // return the consoleReturn in SafeHtml
  public getConsoleReturn() : SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(this.consoleReturn);

  }

  // run action in param
  public runAction(actionId: number) {

    this.actionsService.executeAction(actionId, this.args)
      .subscribe(
        response => {

          this.consoleReturn = response;

        },
        error => {

          this.consoleReturn = error;

      });

  }

  constructor(private sanitizer: DomSanitizer,
              private actionsService: ActionsService) { }

}
