import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { isNullOrUndefined } from "util";

import { ScenariosService } from "../service/scenarios.service";
import { ModulesService } from "../service/modules.service";
import { GraphsService } from "../service/graphs.service";

import { DialogNodeComponent } from "./dialog-node/dialog-node.component";

import { Module, Scenario, Task } from "../front-ops";

const sigma: any = require("../../js/sigma/sigma.require.js");

@Component({
  host: { "(document:clickNode)": "onNodeClick($event)" },
  selector: "app-add-scenario",
  templateUrl: "./add-scenario.component.html",
  styleUrls: ["./add-scenario.component.scss"]
})
export class AddScenarioComponent implements OnInit {

  @ViewChild("dialogAnchor", {read: ViewContainerRef}) dialogAnchor: ViewContainerRef;

  model: Scenario = { id: null, label: "", description: "", tasks: [], starter_task_id: 0 };

  listModules: Array<Module>;

  countIdTask: number;

  sigInst: any;

  dialogComponentRef: any;

  currentTask: number = null;

  successLink: boolean = false;

  errorLink: boolean = false;

  // Error Messages
  errorMessageGetAllModules: string = "";

  loadModel() {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          return params["id"];

        }

        return null;

      }).subscribe(
        responseRouter => {

        const id: number = parseInt(responseRouter, 10);
        if (!isNullOrUndefined(id) && !isNaN(id)) {

          this.scenariosService
            .getScenario(id)
            .subscribe(
              response => {

                this.model = response;
                const lentghTask: number = this.model.tasks.length;
                this.countIdTask = this.model.tasks[lentghTask - 1].inner_scenario_id + 1;
                this.refreshGraph();

            });

        } else {

          this.model = { id: null, label: "", description: "", tasks: [], starter_task_id: 0 };

        }

      },
      error => {

        this.model = { id: null, label: "", description: "", tasks: [], starter_task_id: 0 };

      });

  }

  loadActions() {

    this.modulesService
      .getAllModules()
      .subscribe(
        response => {

          this.listModules = response;

        },
        error => {

          this.errorMessageGetAllModules = error;

        });

  }

  changeVisibility(module: Module) {

    module.visibility = !module.visibility;

  }

  resetGraph() {

    document.getElementById("sigma-new-graph").innerHTML = "";
    this.model.starter_task_id = 0;
    this.model.tasks = [];
    this.countIdTask = 0;
    this.dialogAnchor.clear();
    this.successLink = false;
    this.errorLink = false;

  }

  addTask(idAction: number, labelAction: string, actionArgs: string) {

    let newTask: Task = {id: null, inner_scenario_id: this.countIdTask, action_id: idAction, label: labelAction, description: "", args: actionArgs, success_id: null, error_id: null };
    this.countIdTask++;
    this.model.tasks.push(newTask);
    this.refreshGraph();

  }

  onNodeClick(event: any) {

    this.createDialogNode(event.detail);

  }

  onScenarioSubmit() {

    if(isNullOrUndefined(this.model.id)) {

      this.scenariosService.putScenario(this.model)
        .subscribe(
          response => {

            this.scenariosService.refreshAllScenarios();
            this.router.navigate(["/scenarios"]);

          });

    } else {

      this.scenariosService.postScenario(this.model)
        .subscribe(
          response => {

            this.scenariosService.refreshAllScenarios();
            this.router.navigate(["/scenarios/" + this.model.id]);

          });

    }

  }

  back() {

    this.router.navigate(["/scenarios"]);

  }

  refreshGraph() {

    document.getElementById("sigma-new-graph").innerHTML = "";
    this.sigInst =  new sigma({
      graph: this.graphsService.getSigmaGraph(this.model),
      renderers: [
        {
          container: document.getElementById("sigma-new-graph"),
          type: "canvas"
        }
      ],
      settings: {

        minArrowSize: 10

      }
    });
    this.sigInst.bind("clickNode", function (node: any) {

      document.dispatchEvent(new CustomEvent("clickNode", { "detail": node.data.node.id }));

    });
    if(this.model.tasks[this.currentTask]) {

      this.sigInst.graph.changeColorSelected(this.model.tasks[this.currentTask].inner_scenario_id);

    }
    this.sigInst.refresh();

  }

  selectedCurrentTask(taskId: number): boolean {

    if(isNullOrUndefined(this.currentTask)) {

      return false;

    }
    if(this.model.tasks[this.currentTask].inner_scenario_id !== taskId) {

      return false;

    }
    return true;

}

  createDialogNode(idTask: number) {

    const taskFind: Task = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === idTask);
    if(this.successLink) {

      this.successLink = false;
      this.dialogComponentRef.instance.successLink = false;
      this.model.tasks[this.currentTask].success_id = taskFind.inner_scenario_id;
      this.dialogComponentRef.instance.successLabel = taskFind.label;
      this.refreshGraph();
      return;

    }
    if(this.errorLink) {

      this.errorLink = false;
      this.dialogComponentRef.instance.errorLink = false;
      this.model.tasks[this.currentTask].error_id = taskFind.inner_scenario_id;
      this.dialogComponentRef.instance.errorLabel = taskFind.label;
      this.refreshGraph();
      return;

    }
    this.currentTask = this.model.tasks.indexOf(taskFind);
    this.sigInst.graph.changeColorSelected(taskFind.inner_scenario_id);
    this.sigInst.refresh();
    this.dialogAnchor.clear();
    const dialogComponentFactory: any = this.componentFactoryResolver.resolveComponentFactory(DialogNodeComponent);
    this.dialogComponentRef = this.dialogAnchor.createComponent(dialogComponentFactory);
    this.dialogComponentRef.instance.label = taskFind.label;
    this.dialogComponentRef.instance.argsHelper = taskFind.args;
    this.dialogComponentRef.instance.starterTask = this.model.starter_task_id === taskFind.inner_scenario_id;
    this.dialogComponentRef.instance.successLabel = null;
    this.dialogComponentRef.instance.errorLabel = null;
    if(!isNullOrUndefined(taskFind.success_id)) {

      this.dialogComponentRef.instance.successLabel = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === taskFind.success_id).label;

    }
    if(!isNullOrUndefined(taskFind.error_id)) {

      this.dialogComponentRef.instance.errorLabel = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === taskFind.error_id).label;

    }
    this.dialogComponentRef.instance.deleteSuccess.subscribe(() => {

      this.model.tasks[this.currentTask].success_id = null;
      this.dialogComponentRef.instance.successLabel = null;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.deleteError.subscribe(() => {

      this.model.tasks[this.currentTask].error_id = null;
      this.dialogComponentRef.instance.errorLabel = null;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.starter.subscribe(() => {

      this.model.starter_task_id = this.model.tasks[this.currentTask].inner_scenario_id;
      this.dialogComponentRef.instance.starterTask = true;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.success.subscribe(() => {

      this.successLink = true;
      this.errorLink = false;
      this.dialogComponentRef.instance.successLink = true;
      this.dialogComponentRef.instance.errorLink = false;

    });
    this.dialogComponentRef.instance.error.subscribe(() => {

      this.errorLink = true;
      this.successLink = false;
      this.dialogComponentRef.instance.successLink = false;
      this.dialogComponentRef.instance.errorLink = true;

    });
    this.dialogComponentRef.instance.cancelAction.subscribe(() => {

      this.errorLink = false;
      this.successLink = false;
      this.dialogComponentRef.instance.successLink = false;
      this.dialogComponentRef.instance.errorLink = false;

    });
    this.dialogComponentRef.instance.submit.subscribe(response => {

      this.model.tasks[this.currentTask].label = response.label;
      this.model.tasks[this.currentTask].args = response.args;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.deleted.subscribe(() => {

      this.errorLink = false;
      this.successLink = false;
      this.model.tasks.forEach(task => {

        const indexTask: number = this.model.tasks.indexOf(task);
        const innerIdTask: number = task.inner_scenario_id;
        switch(this.model.tasks[this.currentTask].inner_scenario_id) {

          case task.inner_scenario_id:
            this.model.tasks.splice(indexTask, 1);
            break;

          case task.success_id:
            this.model.tasks[indexTask].success_id = null;
            break;

          case task.error_id:
            this.model.tasks[indexTask].error_id = null;
            break;

          default:

        }
        if(innerIdTask === this.model.starter_task_id) {

          if(this.model.tasks[0]) {

            this.model.starter_task_id = this.model.tasks[0].inner_scenario_id;

          } else {

            this.model.starter_task_id = this.countIdTask;

          }

        }

      });
      this.currentTask = null;
      this.dialogComponentRef.destroy();
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.close.subscribe(() => {

      this.errorLink = false;
      this.successLink = false;
      this.dialogComponentRef.destroy();

    });

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scenariosService: ScenariosService,
    private modulesService: ModulesService,
    private graphsService: GraphsService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

    this.loadModel();
    this.errorMessageGetAllModules = "";
    this.currentTask = null;
    this.countIdTask = 0;
    this.successLink = false;
    this.errorLink = false;
    this.loadActions();

    if(sigma.classes.graph.hasMethod("changeColorSelected")) {

      return;

    }

    sigma.classes.graph.addMethod("changeColorSelected", function(nodeId: number) {

      this.nodesArray.forEach(node => {

        if(node.id !== nodeId) {

          node.color = "#000";

        } else {

          node.color = "#FDD835";

        }

      });

    });

  }

}
