import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { isNullOrUndefined } from "util";

import { ActionsService } from "../service/actions.service";

import { Action, Log, SaltAttribute } from "../front-ops";

import { EnvironmentsService } from "../service/environments.service";
import { LogsService } from "../service/logs.service";

@Component({

  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]

}) export class ActionComponent implements OnInit {

  // current action in the component
  action: Action;

  // module command of current action
  moduleCommand: string;

  // string to stock args to run the action with it.
  args: string = "";

  targetCtrl: FormControl;

  // all salt attributes
  saltAttributes: Array<SaltAttribute>;

  // saltAttributes filtered to autocomplete
  saltAttributesFiltered: any;

  // string to stock target to run the action with it.
  target: string = "";

  // string to display the action execution return.
  consoleReturn: Log = null;

  // error messages
  errorMessageGetAllSaltAttributes: string = "";

  addSaltAttributePattern(target: string, saltPattern: string): string {

    return target.split(/:(?:[^\ ]*)$/)[0] + ":" + saltPattern;

  }

  checkLog() {

    this.logsService.getLogAction(this.action.id)
      .subscribe(
        response => {

          this.consoleReturn = response;

    });

  }

  private loadSaltAttribute() {

    this.environmentsService.getAllSaltAttribute()
      .subscribe(
        response => {

          this.saltAttributes = response;

      },
        error => {

          this.errorMessageGetAllSaltAttributes = error;

    });

  }

  // run action in param
  public runAction(actionId: number) {

    this.consoleReturn = null;
    this.actionsService.executeAction(actionId, this.args, this.target);

  }

  public saltAttributesFilter(target: string): Array<SaltAttribute> {

    const filteredTarget: Array<string> = this.searchCategory(target);
    if(isNullOrUndefined(filteredTarget)) {

      return [];

    }
    return this.saltAttributes.filter(saltAttributeFilter => {

      return saltAttributeFilter.category.toLowerCase() === filteredTarget[0].toLowerCase() &&
          saltAttributeFilter.pattern.toLowerCase() !== filteredTarget[1].toLowerCase() &&
        (saltAttributeFilter.label.toLowerCase().indexOf(filteredTarget[1].toLowerCase()) === 0 ||
        saltAttributeFilter.pattern.toLowerCase().indexOf(filteredTarget[1].toLowerCase()) === 0);

    });

  }

  private searchCategory(target: string): Array<string> {

    if(isNullOrUndefined(target)) {

      return null;

    }
    const resultPattern: Array<string> = target.match(/\w+:(?:.*)$/);
    if(isNullOrUndefined(resultPattern) || resultPattern.length === 0) {

      return null;

    }
    const splitArray: Array<string> = resultPattern[resultPattern.length - 1].split(/:|(?:\ )/);
    return [splitArray[splitArray.length - 2], splitArray[splitArray.length - 1]];

  }

  constructor(private actionsService: ActionsService,
              private logsService: LogsService,
              private environmentsService: EnvironmentsService) { }

  ngOnInit() {

    this.errorMessageGetAllSaltAttributes = "";
    this.loadSaltAttribute();
    this.checkLog();
    this.targetCtrl = new FormControl();
    this.saltAttributesFiltered = this.targetCtrl.valueChanges
      .startWith(null)
      .map(target => this.saltAttributesFilter(target));
    this.logsService.actionChangeObs
      .subscribe(
        response => {

          if(this.action.id === response.objectId) {

            this.consoleReturn = response.log;

          }

    });

  }

}
