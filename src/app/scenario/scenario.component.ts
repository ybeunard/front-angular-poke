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

import * as Sigma from "../../js/sigma/sigma.require";

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

  // change console visibility
  public changeVisibility() {

    this.consoleVisibility = !this.consoleVisibility;

  }

  // change log visibility to see detail of log or not
  public changeVisibilityLogConsole(logConsole: Log) {

    const logFindIndex: number = this.consoleReturn.findIndex((logTest: Log ) => logTest === logConsole);
    this.consoleReturn[logFindIndex].visibility = !this.consoleReturn[logFindIndex].visibility;

  }

  // return true if the consoleReturn contain information else return false
  public checkConsoleMessage(): boolean {

    if(isNullOrUndefined(this.consoleReturn)) {

      return true;

    }
    return this.consoleReturn.length === 0;

  }

  // chek if one instance of the scenarion is running
  public checkInstanceRunning(): boolean {

    if(isNullOrUndefined(this.scenario)) {

      return false;

    }
    return this.instancesService.checkInstanceScenarioRunning(this.scenario.id);

  }

  // check if the consoleReturn contain information else take consoleVisibility to false
  // return console visibility
  public checkVisibility(): boolean {

    if(isNullOrUndefined(this.consoleReturn) || this.consoleReturn.length === 0) {

      this.consoleVisibility = false;

    }
    return this.consoleVisibility;

  }

  // return the consoleReturn in SafeHtml
  public getConsoleReturn(message: string) : SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(message);

  }

  // load a new graph sigma
  private loadGraph() {

    document.getElementById("sigma-graph").innerHTML = "";
    this.sigInst =  new Sigma({
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
    this.sigInst.graph.refreshColorStatus();
    this.sigInst.refresh();

  }

  // recover id scenario in the URL and load the action.
  private loadScenario() {

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
        if (!isNullOrUndefined(id) && !isNaN(id)) {

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

          this.errorMessageScenarioIdIncorrect = "Scenario ID " + responseRouter + " doesn't exist";

        }

      },
      error => {

        this.errorMessageScenarioIdIncorrect = error;

      });

  }

  // refresh the consoleReturn and set consoleVisibility to true
  private refreshConsoleReturn() {

    this.consoleReturn = this.logsService.getCurrentLogsScenario(this.scenario.id);
    if(this.consoleReturn.length !== 0) {

      this.consoleVisibility = true;

    }

  }

  // refresh the sigma graph status
  private refreshStatusGraph() {

    this.logsService
      .getStatusGraph(this.scenario)
      .forEach( statusGraph => {

        this.sigInst.graph.changeColorStatus(statusGraph.idTask, statusGraph.status, statusGraph.nextTask);

      });
    this.sigInst.refresh();

  }

  // run current scenario in component
  public runScenario() {

    this.consoleReturn = [];
    this.sigInst.graph.refreshColorStatus();
    this.sigInst.refresh();
    this.logsService.refreshLogsScenario(this.scenario.id);
    this.instancesService.runInstanceScenario(this.scenario.id);

  }

  // go to the interface update scenario
  public updateScenario() {

    this.router.navigate(["/scenarios/" + this.scenario.id + "/update"]);

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
      () => {

        this.refreshConsoleReturn();
        this.refreshStatusGraph();

      },
      error => {

        this.errorMessageResponseTasksServiceError = error;

    });

    if(Sigma.classes.graph.hasMethod("changeColorStatus")) {

      return;

    }

    Sigma.classes.graph.addMethod("changeColorStatus", function(nodeId: number, status: number, nextNodeId: number) {

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

    Sigma.classes.graph.addMethod("refreshColorStatus", function () {

      this.nodesArray.forEach(node => {

        node.borderColor = "#fff";

      });
      this.edgesArray.forEach(edge => {

        edge.color = "#000";

      });

    });

    // We gave our own name 'border' to the custom renderer
    Sigma.canvas.nodes.border = function(node: any, context: any, settings: any) {
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
