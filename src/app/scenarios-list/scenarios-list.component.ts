import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ScenariosService } from "../service/scenarios.service";

import { Scenario } from "../front-ops";

@Component({

  selector: "app-scenarios-list",
  templateUrl: "./scenarios-list.component.html",
  styleUrls: ["./scenarios-list.component.scss"]

})
export class ScenariosListComponent implements OnInit {

  listScenarios: Array<Scenario>;

  // Error Messages
  errorMessageGetAllScenarios: string = "";

  loadScenarios() {

    this.scenariosService
      .getAllScenarios()
      .subscribe(
        response => {

          this.listScenarios = response;

        },
        error => {

          if(error.status === 404) {

           return;

          }
          this.errorMessageGetAllScenarios = error;

      });

  }

  displayScenario(scenario: Scenario) {

    this.router.navigate(["/scenarios", scenario.id]);

  }

  addScenario() {

    this.router.navigate(["/scenarios/add"]);

  }

  constructor(private router: Router, private scenariosService: ScenariosService) { }

  ngOnInit() {

    this.errorMessageGetAllScenarios = "";
    this.loadScenarios();

  }

}
