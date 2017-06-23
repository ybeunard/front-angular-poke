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

  loadScenarios() {

    this.scenariosService
      .getAllScenarios()
      .subscribe( (response) => {

        this.listScenarios = response;

      } );

  }

  displayScenario(scenario: Scenario) {

    this.router.navigate(["/scenarios", scenario.id]);

  }

  constructor(private router: Router, private scenariosService: ScenariosService) { }

  ngOnInit() {

    this.loadScenarios();

  }

}
