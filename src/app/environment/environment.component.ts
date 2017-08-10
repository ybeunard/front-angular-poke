import { Component, OnInit } from "@angular/core";

import { EnvironmentsService } from "../service/environments.service";

import { Environment } from "../front-ops";

@Component({
  selector: "app-environment",
  templateUrl: "./environment.component.html",
  styleUrls: ["./environment.component.scss"]
})
export class EnvironmentComponent implements OnInit {

  listEnvironmentsSortByCategory: Array<{ category: string, environments: Array<Environment> }>;

  // Error Messages
  errorMessageGetAllEnvironmentsSortByCategory: string = "";

  // Warning Messages
  warningMessageNoContentEnvironment: string = "";

  // load all environments
  private loadEnvironments() {

    this.environmentsService
      .getAllEnvironmentsSortByCategory()
      .subscribe(
        response => {

          if (response.length === 0) {

            this.warningMessageNoContentEnvironment = "No Environment in the database";

          }
          this.listEnvironmentsSortByCategory = response;

        },
        error => {

          this.errorMessageGetAllEnvironmentsSortByCategory = error;

    });

  }

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {

    this.errorMessageGetAllEnvironmentsSortByCategory = "";
    this.warningMessageNoContentEnvironment = "";
    this.loadEnvironments();

  }

}
