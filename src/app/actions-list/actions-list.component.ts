import {Component, OnInit} from '@angular/core';
import { Subscription }   from "rxjs/Subscription";

import { ActionsService } from "../service/actions.service";

import {Action, Module} from '../front-ops';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({

  selector: "app-actions-list",
  templateUrl: "./actions-list.component.html",
  styleUrls: ["./actions-list.component.scss"]

}) export class ActionsListComponent implements OnInit {

  listActionsSortByModule: Array< { module: Module, actions: Action[], visibility: boolean } >;

  errorMessage: string;

  selectedModule: number;

  subscription: Subscription;

  loadActions() {

    this.actionsService
      .getListActionsSortByModule()
      .subscribe(
        response => {

          this.listActionsSortByModule = response;
          this.initCurrentModuleVisibility();

        },
          error => this.errorMessage = error
      );

  }

  initCurrentModuleVisibility() {

    this.route.params
      .map((params: Params) => {

        if(params["module"]) {

          return params["module"];

        }

      }).subscribe((id: number) => {

        if(id) {

          const indexModule: number = this.listActionsSortByModule.findIndex(list => list.module.id == id);
          if(indexModule != -1) {

            this.listActionsSortByModule[indexModule].visibility = true;

          }

        }

      });

  }

  changeVisibility(module: { module: Module, actions: Action[], visibility: boolean }) {

    module.visibility = !module.visibility;

  }

  displayAction(action: Action) {

    this.router.navigate(["/actions/", action.module_id, action.id]);

  }

  constructor(private route: ActivatedRoute, private router: Router, private actionsService: ActionsService) { }

  ngOnInit() {

    this.loadActions();

  }

}
