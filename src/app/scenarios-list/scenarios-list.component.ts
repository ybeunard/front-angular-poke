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

  // current list of scenarios in the component
  listScenarios: Array<Scenario>;

  // Error Messages
  errorMessageGetAllScenarios: string = "";

  // Warning Messages
  warningMessageNoContentScenario: string = "";

  // go to the interface create scenario
  public addScenario() {

    this.router.navigate(["/scenarios/add"]);

  }

  // call the component scenario with the scenario in param
  public displayScenario(scenario: Scenario) {

    this.router.navigate(["/scenarios", scenario.id]);

  }

  // load list of all scenarios in the component
  private loadScenarios() {

    this.scenariosService
      .getAllScenarios()
      .subscribe(
        response => {

          if(response.length === 0) {

            this.warningMessageNoContentScenario = "No scenario in the database";

          }
          this.listScenarios = response;

        },
        error => {

          this.errorMessageGetAllScenarios = error;

      });

  }

  constructor(private router: Router, private scenariosService: ScenariosService) { }

  ngOnInit() {

    this.errorMessageGetAllScenarios = "";
    this.warningMessageNoContentScenario = "";
    this.loadScenarios();

  }

}
