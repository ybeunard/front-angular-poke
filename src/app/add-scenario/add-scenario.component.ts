import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { isNullOrUndefined } from "util";

import { ScenariosService } from "../service/scenarios.service";
import { ModulesService } from "../service/modules.service";
import { GraphsService } from "../service/graphs.service";

import { DialogNodeComponent } from "./dialog-node/dialog-node.component";

import { Module, Scenario, Task } from "../front-ops";

import * as Sigma from "../../js/sigma/sigma.require";
import { ActionsService } from "../service/actions.service";

@Component({

  host: { "(document:clickNode)": "onNodeClick($event)" },
  selector: "app-add-scenario",
  templateUrl: "./add-scenario.component.html",
  styleUrls: ["./add-scenario.component.scss"]

}) export class AddScenarioComponent implements OnInit {

  // viewContainer to create the dialog-node component
  @ViewChild("dialogAnchor", {read: ViewContainerRef}) dialogAnchor: ViewContainerRef;

  dialogComponentRef: any;

  // the model scenario before create or update him in the database
  model: Scenario = { id: null, label: "", description: "", tasks: [], starter_task_id: 0 };

  // current list of modules in the component
  listModules: Array<Module>;

  // count to create the inner_task_id
  countIdTask: number;

  // sigma instance graph
  sigInst: any;

  // current task selected, if no task selected currentTaskIndex = null
  currentTaskIndex: number = null;

  successLink: boolean = false;

  errorLink: boolean = false;

  // Error Messages
  errorMessageGetAllModules: string = "";
  errorMessageGetScenario: string = "";

  // Warning Messages
  warningMessageNoContentModule: string = "";

  // add new task to the current scenario model
  public addTask(idAction: number, labelAction: string) {

    let newTask: Task = {id: null, inner_scenario_id: this.countIdTask, action_id: idAction, label: labelAction, description: "", args: "", success_id: null, error_id: null };
    this.countIdTask++;
    this.model.tasks.push(newTask);
    this.refreshGraph();

  }

  // back to the scenarios home page
  public back() {

    this.router.navigate(["/scenarios"]);

  }

  // change visibility of module in param
  public changeVisibility(module: Module) {

    module.visibility = !module.visibility;

  }

  // check if we do an action link on the clicked task,
  // create the link,
  // else create new dialog node
  public createDialogNode(idTask: number) {

    const taskFind: Task = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === idTask);
    if(this.successLink) {

      this.resetSuccessErrorLink(false, false);
      this.model.tasks[this.currentTaskIndex].success_id = taskFind.inner_scenario_id;
      this.dialogComponentRef.instance.successLabel = taskFind.label;
      this.refreshGraph();
      return;

    }
    if(this.errorLink) {

      this.resetSuccessErrorLink(false, false);
      this.model.tasks[this.currentTaskIndex].error_id = taskFind.inner_scenario_id;
      this.dialogComponentRef.instance.errorLabel = taskFind.label;
      this.refreshGraph();
      return;

    }
    this.currentTaskIndex = this.model.tasks.indexOf(taskFind);
    this.sigInst.graph.changeColorSelected(taskFind.inner_scenario_id);
    this.sigInst.refresh();
    this.dialogAnchor.clear();
    const dialogComponentFactory: any = this.componentFactoryResolver.resolveComponentFactory(DialogNodeComponent);
    this.dialogComponentRef = this.dialogAnchor.createComponent(dialogComponentFactory);
    this.initDialogNode(taskFind);
    this.dialogComponentRef.instance.deleteSuccess.subscribe(() => {

      this.model.tasks[this.currentTaskIndex].success_id = null;
      this.dialogComponentRef.instance.successLabel = null;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.deleteError.subscribe(() => {

      this.model.tasks[this.currentTaskIndex].error_id = null;
      this.dialogComponentRef.instance.errorLabel = null;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.starter.subscribe(() => {

      this.model.starter_task_id = this.model.tasks[this.currentTaskIndex].inner_scenario_id;
      this.dialogComponentRef.instance.starterTask = true;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.success.subscribe(() => {

      this.resetSuccessErrorLink(true, false);

    });
    this.dialogComponentRef.instance.error.subscribe(() => {

      this.resetSuccessErrorLink(false, true);

    });
    this.dialogComponentRef.instance.cancelAction.subscribe(() => {

      this.resetSuccessErrorLink(false, false);

    });
    this.dialogComponentRef.instance.submit.subscribe(response => {

      this.model.tasks[this.currentTaskIndex].label = response.label;
      this.model.tasks[this.currentTaskIndex].args = response.args;
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.deleted.subscribe(() => {

      this.resetSuccessErrorLink(false, false);
      this.model.tasks.forEach(task => {

        const taskIndex: number = this.model.tasks.indexOf(task);
        const innerIdTask: number = task.inner_scenario_id;
        switch(this.model.tasks[this.currentTaskIndex].inner_scenario_id) {

          case task.inner_scenario_id:
            this.model.tasks.splice(taskIndex, 1);
            break;

          case task.success_id:
            this.model.tasks[taskIndex].success_id = null;
            break;

          case task.error_id:
            this.model.tasks[taskIndex].error_id = null;
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
      this.currentTaskIndex = null;
      this.dialogComponentRef.destroy();
      this.refreshGraph();

    });
    this.dialogComponentRef.instance.close.subscribe(() => {

      this.resetSuccessErrorLink(false, false);
      this.currentTaskIndex = null;
      this.dialogComponentRef.destroy();
      this.refreshGraph();

    });

  }

  // init dialog node with the task in params
  private initDialogNode(task: Task) {

    this.dialogComponentRef.instance.label = task.label;
    this.actionsService.getArgsAction(task.action_id)
      .subscribe(
        response => {

          this.dialogComponentRef.instance.argsHelper = response;

        },
        () => {

          this.dialogComponentRef.instance.argsHelper = "Error Loading Args Action";

      });
    this.dialogComponentRef.instance.args = task.args;
    this.dialogComponentRef.instance.starterTask = this.model.starter_task_id === task.inner_scenario_id;
    this.dialogComponentRef.instance.successLabel = null;
    this.dialogComponentRef.instance.errorLabel = null;
    if(!isNullOrUndefined(task.success_id)) {

      this.dialogComponentRef.instance.successLabel = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === task.success_id).label;

    }
    if(!isNullOrUndefined(task.error_id)) {

      this.dialogComponentRef.instance.errorLabel = this.model.tasks.find(taskTest => taskTest.inner_scenario_id === task.error_id).label;

    }

  }

  // load all actions which can be add in the scenario like task
  private loadActions() {

    this.modulesService
      .getAllModules()
      .subscribe(
        response => {

          if(response.length === 0) {

            this.warningMessageNoContentModule = "No module in the database";

          }
          this.listModules = response;

        },
        error => {

          this.errorMessageGetAllModules = error;

        });

  }

  // check if we update an exeisting scenario in the URL and load it else create an empty scenario
  private loadModel() {

    this.route.params
      .map((params: Params) => {

        if(params["id"]) {

          return params["id"];

        }

      }).subscribe(
      responseRouter => {

        if(isNullOrUndefined(responseRouter)) {

          return;

        }
        const id: number = parseInt(responseRouter, 10);
        if (!isNaN(id)) {

          this.scenariosService
            .getScenario(id)
            .subscribe(
              response => {

                this.model = response;
                const lentghTask: number = this.model.tasks.length;
                this.countIdTask = this.model.tasks[lentghTask - 1].inner_scenario_id + 1;
                this.refreshGraph();

              },
              error => {

                this.errorMessageGetScenario = error;

            });

        } else {

          this.errorMessageGetScenario = "Scenario ID " + responseRouter + " doesn't exists";

        }

      },
      error => {

        this.errorMessageGetScenario = error;

      });

  }

  // function to catch specific sigma node click event
  public onNodeClick(event: any) {

    this.createDialogNode(event.detail);

  }

  // try to put or post the scenario model
  public onScenarioSubmit() {

    if(isNullOrUndefined(this.model.id)) {

      this.scenariosService.putScenario(this.model);

    } else {

      this.scenariosService.postScenario(this.model);

    }

  }

  // refresh sigma graph
  private refreshGraph() {

    document.getElementById("sigma-new-graph").innerHTML = "";
    this.sigInst =  new Sigma({
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
    if(this.model.tasks[this.currentTaskIndex]) {

      this.sigInst.graph.changeColorSelected(this.model.tasks[this.currentTaskIndex].inner_scenario_id);

    }
    this.sigInst.refresh();

  }

  // reset current graph and all params task associate
  public resetGraph() {

    document.getElementById("sigma-new-graph").innerHTML = "";
    this.model.starter_task_id = 0;
    this.model.tasks = [];
    this.countIdTask = 0;
    this.dialogAnchor.clear();
    this.successLink = false;
    this.errorLink = false;

  }

  // reset success and error link in the component and in the dialog component
  private resetSuccessErrorLink(success: boolean, error: boolean) {

    this.successLink = success;
    this.dialogComponentRef.instance.successLink = success;
    this.errorLink = error;
    this.dialogComponentRef.instance.errorLink = error;

  }

  // check if a task is selected
  public selectedCurrentTask(taskId: number): boolean {

    return !(isNullOrUndefined(this.currentTaskIndex) || this.model.tasks[this.currentTaskIndex].inner_scenario_id !== taskId);

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsService: ActionsService,
    private scenariosService: ScenariosService,
    private modulesService: ModulesService,
    private graphsService: GraphsService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {

    this.errorMessageGetAllModules = "";
    this.errorMessageGetScenario = "";
    this.warningMessageNoContentModule = "";
    this.currentTaskIndex = null;
    this.countIdTask = 0;
    this.successLink = false;
    this.errorLink = false;
    this.loadModel();
    this.loadActions();

    if(Sigma.classes.graph.hasMethod("changeColorSelected")) {

      return;

    }

    Sigma.classes.graph.addMethod("changeColorSelected", function(nodeId: number) {

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
