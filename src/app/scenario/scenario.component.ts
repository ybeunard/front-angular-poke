import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isUndefined } from "util";

import { ScenariosService } from "../service/scenarios.service";
import { TaskService } from "../service/tasks.service";

import { Scenario } from "../front-ops";

const sigma: any = require("../../js/sigma/sigma.require.js");
import "../../js/sigma/plugins/sigma.layout.forceAtlas2.min.js";
import "../../js/sigma/plugins/sigma.parsers.json.min.js";

@Component({
  selector: "app-scenario",
  templateUrl: "./scenario.component.html",
  styleUrls: ["./scenario.component.scss"]
})
export class ScenarioComponent implements OnInit, AfterViewInit {

  scenario: Scenario;

  loadScenario() {

    this.scenariosService
      .getAllScenarios()
      .subscribe((response) => {

        const listScenarios: Array<Scenario> = response;
        this.foundScenario(listScenarios);

      });

  }

  foundScenario(listScenario: Array<Scenario>) {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          return params["id"];

        }

      }).subscribe((response) => {

      const id: number = parseInt(response, 10);
      if(!isUndefined(id)) {

        const indexScenario: number = listScenario.findIndex((scenario: Scenario) => scenario.id === id);
        if(indexScenario !== -1) {

          this.scenario = listScenario[indexScenario];

        }

      }

    });

  }

  constructor(private route: ActivatedRoute, private router: Router, private scenariosService: ScenariosService, private tasksService: TaskService) { }

  ngOnInit() {

    this.loadScenario();

  }

  ngAfterViewInit() {

    let myGraph = this.tasksService.getSigmaGraph();

    let s = new sigma({
      graph: myGraph,
      renderers: [
        {
          container: document.getElementById("sigma-graph"),
          type: "canvas"
        }
      ]
    });
    s.refresh();

  }

}
