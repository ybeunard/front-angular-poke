import { Component, OnInit } from "@angular/core";
import  {DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isNullOrUndefined } from "util";

import { ScenariosService } from "../service/scenarios.service";
import {ModulesService} from "../service/modules.service";
import {GraphsService} from "../service/graphs.service";
import { LogsService } from "../service/logs.service";
import { InstancesService } from "../service/instances.service";

import { Log, Scenario } from "../front-ops";

const sigma: any = require("../../js/sigma/sigma.require");

@Component({

  selector: "app-scenario",
  templateUrl: "./scenario.component.html",
  styleUrls: ["./scenario.component.scss"]

})
export class ScenarioComponent implements OnInit {

  scenario: Scenario;

  consoleReturn: Array<Log>;

  consoleVisibility: boolean = false;

  // Sigma instance
  sigInst: any;

  // Error Messages
  errorMessageGetScenario: string = "";
  errorMessageScenarioIdIncorrect: string = "";
  errorMessageResponseTasksServiceError: string = "";

  loadScenario() {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          this.errorMessageScenarioIdIncorrect = "";
          this.errorMessageGetScenario = "";
          return params["id"];

        }

      }).subscribe(
      responseRouter => {

        const id: number = parseInt(responseRouter, 10);
        if (!isNullOrUndefined(id)) {

            this.scenariosService
              .getScenario(id)
              .subscribe(
                response => {

                  this.scenario = response;
                  this.refreshConsoleReturn();
                  this.loadGraph();
                  this.refreshStatusGraph();

                },
                error => {

                  this.errorMessageGetScenario = error;

                });

        } else {

          this.errorMessageScenarioIdIncorrect = "Scenario ID " + id + " doesn't exist";

        }

      },
      error => {

        this.errorMessageScenarioIdIncorrect = error;

      });

  }

  runScenario() {

    this.consoleReturn = [];
    this.sigInst.graph.refreshColorStatus();
    this.sigInst.refresh();
    this.logsService.refreshLogsScenario(this.scenario.id);
    this.instancesService.runInstanceScenario(this.scenario.id);

  }

  updateScenario() {

    this.router.navigate(["/scenarios/" + this.scenario.id + "/update"]);

  }

  getConsoleReturn(message: string) : SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(message);

  }

  checkVisibility(): boolean {

    if(isNullOrUndefined(this.consoleReturn) || this.consoleReturn.length === 0) {

      this.consoleVisibility = false;

    }
    return this.consoleVisibility;

  }

  checkInstanceRunning(): boolean {

    if(isNullOrUndefined(this.scenario)) {

      return false;

    }
    return this.instancesService.checkInstanceScenarioRunning(this.scenario.id);

  }

  changeVisibility() {

    this.consoleVisibility = !this.consoleVisibility;

  }

  changeVisibilityLogConsole(logConsole: Log) {

    const logFindIndex: number = this.consoleReturn.findIndex((logTest: Log ) => logTest === logConsole);
    this.consoleReturn[logFindIndex].visibility = !this.consoleReturn[logFindIndex].visibility;

  }

  checkConsoleMessage(): boolean {

    if(isNullOrUndefined(this.consoleReturn)) {

      return true;

    }
    return this.consoleReturn.length === 0;

  }

  refreshConsoleReturn() {

    this.consoleReturn = this.logsService.getCurrentLogsScenario(this.scenario.id);
    if(this.consoleReturn.length !== 0) {

      this.consoleVisibility = true;

    }

  }

  refreshStatusGraph() {

    this.logsService
      .getStatusGraph(this.scenario)
      .forEach( statusGraph => {

        this.sigInst.graph.changeColorStatus(statusGraph.idTask, statusGraph.status, statusGraph.nextTask);

    });
    this.sigInst.refresh();

  }

  loadGraph() {

    document.getElementById("sigma-graph").innerHTML = "";
    this.sigInst =  new sigma({
      graph: this.graphsService.getSigmaGraph(this.scenario),
      renderers: [
        {
          container: document.getElementById("sigma-graph"),
          type: "canvas"
        }
      ],
      settings: {

        defaultNodeType: "border",
        minArrowSize: 10

      }
    });
    this.modulesService
      .foundModuleId(this.scenario.tasks)
      .subscribe(
        response => {

          this.sigInst.graph.setColorNodes(response);
          this.sigInst.refresh();

        });
    this.sigInst.graph.refreshColorStatus();
    this.sigInst.refresh();

  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private modulesService: ModulesService,
              private scenariosService: ScenariosService,
              private instancesService: InstancesService,
              private graphsService: GraphsService,
              private logsService: LogsService) { }

  ngOnInit() {

    this.errorMessageGetScenario = "";
    this.errorMessageScenarioIdIncorrect = "";
    this.errorMessageResponseTasksServiceError = "";
    this.consoleReturn = [];
    this.loadScenario();

    this.logsService.instanceChange.subscribe(
      (idScenario :number) => {

        this.refreshConsoleReturn();
        this.refreshStatusGraph();

      },
      error => {

        this.errorMessageResponseTasksServiceError = error;

    });

    if(sigma.classes.graph.hasMethod("changeColorStatus")) {

      return;

    }

    sigma.classes.graph.addMethod("changeColorStatus", function(nodeId: number, status: number, nextNodeId: number) {

      this.nodesArray.forEach(node => {

        if(node.id !== nodeId) {

          return;

        }
        switch(status) {

          case 1:

            node.borderColor = "#ff6600";
            break;

          case 2:

            node.borderColor = "#00cc00";
            break;

          case 3:

            node.borderColor = "#cc272b";
            break;

          default:

            node.borderColor = "#000000";
            break;

        }
        nodeId = node.id;

      });
      this.edgesArray.forEach(edge => {

        if(edge.target !== nextNodeId || edge.source !== nodeId) {

          return;

        }
        switch(status) {

          case 2:

            edge.color = "#00cc00";
            break;

          case 3:

            edge.color = "#cc272b";
            break;

          default:

            edge.color = "#000000";
            break;

        }

      });

    });

    sigma.classes.graph.addMethod("refreshColorStatus", function () {

      this.nodesArray.forEach(node => {

        node.borderColor = "#fff";

      });
      this.edgesArray.forEach(edge => {

        edge.color = "#000";

      });

    });

    sigma.classes.graph.addMethod("setColorNodes", function (modulesColor: Array<{ idModule: number, idTask: number }>) {

      this.nodesArray.forEach(node => {

        let moduleColorFind:  { idModule: number, idTask: number } = modulesColor.find(moduleColorTest => moduleColorTest.idTask === node.id);
        if(isNullOrUndefined(moduleColorFind)) {

          moduleColorFind.idModule = -1;

        }
        switch (moduleColorFind.idModule) {

          case 0:
            node.color = "#0099ff";
            break;

          case 1:
            node.color = "#cc66ff";
            break;

          default:
            node.color = "#000";

        }

      });

    });

    // We gave our own name 'border' to the custom renderer
    sigma.canvas.nodes.border = function(node: any, context: any, settings: any) {
      let prefix: any = settings("prefix") || "";

      context.fillStyle = node.color || settings("defaultNodeColor");
      context.beginPath();
      context.arc(
        node[prefix + "x"],
        node[prefix + "y"],
        node[prefix + "size"],
        0,
        Math.PI * 2,
        true
      );

      context.closePath();
      context.fill();

      // Adding a border
      context.lineWidth = 4;
      context.strokeStyle = node.borderColor || "#fff";
      context.stroke();
    };

  }

}
