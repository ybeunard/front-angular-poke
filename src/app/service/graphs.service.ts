import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";

import { Graph, Scenario, Task } from "../front-ops";

@Injectable()
export class GraphsService {

  // Object to construct diagram with sigma
  private sigmaNodesDiagram: Graph;

  // counter of edge to create diagram
  private edgeCount: number;

  // sigma position used in graph
  private nodePos: Array<{ x: number, y: number }>;

  // return sigma graph object associated to script argument
  getSigmaGraph(scenario: Scenario): Graph {

    this.nodePos = [];
    this.edgeCount = 0;
    this.sigmaNodesDiagram = { nodes: [], edges: [] };
    const starterTask: Task = scenario.tasks.find(task => task.inner_scenario_id === scenario.starter_task_id);
    if(isNullOrUndefined(starterTask)) {

      return this.sigmaNodesDiagram;

    }
    this.nodePos[starterTask.inner_scenario_id] = { x: 0, y: 0 };
    this.extractTask(scenario, starterTask);
    this.checkMissTask(scenario, starterTask.inner_scenario_id);
    return this.sigmaNodesDiagram;

  }

  private extractFollowingTask(scenario: Scenario, task: Task) {

    this.checkFollowingTask(scenario, task, task.success_id, "#00cc00");
    this.checkFollowingTask(scenario, task, task.error_id, "#cc272b");

  }

  private checkFollowingTask(scenario: Scenario, task: Task, taskFollowing: number, color: string) {

    if(isNullOrUndefined(taskFollowing)) {

      return;

    }

    const newTask: Task = scenario.tasks.find(taskTest => taskTest.inner_scenario_id === taskFollowing);
    this.sigmaNodesDiagram.edges.push({ id: this.edgeCount, source: task.inner_scenario_id, target: taskFollowing, type: "arrow", color: color });
    this.edgeCount++;
    if(this.createPositionNodes(task.inner_scenario_id, taskFollowing)) {

      this.extractTask(scenario, newTask);

    }

  }

  private createPositionNodes(parentId: number, childId: number): boolean {

    if( this.nodePos[childId]) {

      return false;

    }
    let x: number = this.nodePos[parentId].x;
    const y: number = this.nodePos[parentId].y + 1;
    if(this.checkPosition(x, y)) {

      this.nodePos[childId] = { x: x, y: y };
      return true;

    }
    x++;
    while(true) {

      if(this.checkPosition(x, y)) {

        this.nodePos[childId] = { x: x, y: y };
        break;

      }
      if(this.checkPosition(-x, y)) {

        this.nodePos[childId] = { x: -x, y: y};
        break;

      }

      x++;

    }
    return true;

  }

  private checkPosition(x: number, y: number): boolean {

    let check: boolean = true;
    this.nodePos.forEach((pos: {x: number, y: number}) => {

      if(pos.x === x && pos.y === y) {

        check = false;

      }

    });
    return check;

  }

  private extractTask(scenario: Scenario, task: Task) {

    this.sigmaNodesDiagram.nodes.push({ id: task.inner_scenario_id, label: task.label, x: this.nodePos[task.inner_scenario_id].x, y: this.nodePos[task.inner_scenario_id].y, size: 3, color: "#000" });

    this.extractFollowingTask(scenario, task);

  }

  private checkMissTask(scenario: Scenario, idParent: number) {

    scenario.tasks.forEach((task: Task) => {

      if(this.createPositionNodes(idParent, task.inner_scenario_id)) {

        this.extractTask(scenario, task);

      }

    });

  }

}
