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

  loadAction() {

    this.actionsService
      .getAllActions()
      .subscribe((response) => {

        this.foundAction(response);

      });

  }

  foundAction(listActions: any) {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          return params["id"];

        }

      }).subscribe((id: string) => {

      if(id) {

        const indexAction: number = listActions.findIndex( action => action.id.toString() === id);
        if(indexAction !== -1) {

          this.action = listActions[indexAction];

        }

      }

    });

  }

  constructor(private route: ActivatedRoute, private router: Router, private actionsService: ActionsService) { }

  ngOnInit() {

    this.loadAction();

    if(isUndefined(this.action)) {

      return;

    }

  }

}
