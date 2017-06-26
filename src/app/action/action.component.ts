import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

import { ActionsService } from "../service/actions.service";

import { Action } from "../front-ops";
import {isUndefined} from "util";

@Component({

  selector: "app-action",
  templateUrl: "./action.component.html",
  styleUrls: ["./action.component.scss"]

}) export class ActionComponent implements OnInit {

  action: Action;
  args: string = "";
  console: string = "";

  loadAction() {

    this.actionsService
      .getAllActions()
      .subscribe((response) => {

        const listActions: Array<Action> = response;
        this.foundAction(listActions);

      });

  }

  foundAction(listActions: Array<Action>) {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          return params["id"];

        }

      }).subscribe((response) => {

      const id: number = parseInt(response, 10);
      if(!isUndefined(id)) {

        const indexAction: number = listActions.findIndex( (action: Action) => action.id === id);
        if(indexAction !== -1) {

          this.console = "";
          this.action = listActions[indexAction];

        }

      }

    });

  }

  runAction(action: Action) {

    this.actionsService.executeAction(action, this.args)
      .subscribe((response) => {

        this.console = response;

      },
        (error) => {

          this.console = error;

        });

  }

  constructor(private route: ActivatedRoute, private router: Router, private actionsService: ActionsService) { }

  ngOnInit() {

    this.loadAction();

  }

}
