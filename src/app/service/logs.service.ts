import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Log, Instance, Scenario, Task } from "../front-ops";

@Injectable()
export class LogsService {

  private listCurrentInstance: Array<Instance> = [];

  // subject and observable to transmit all change on console to component
  private instanceChangeSource: Subject<number> = new Subject<number>();
  public instanceChange: Observable<number> = this.instanceChangeSource.asObservable();

  getCurrentLogsScenario(idScenario: number): Array<Log> {

    const currentInstance: Instance = this.listCurrentInstance.find((instance: Instance) => instance.scenario_id === idScenario);
    if(currentInstance) {

      return currentInstance.logs;

    }
    return [];

  }

  recoverLogsInstance(instance: Instance) {

    this.addInstance(instance);
    this.instanceChangeSource.next(instance.scenario_id);

  }

  getStatusGraph(scenario: Scenario): Array<{ idTask: number, status: number, nextTask: number }> {

    let tasksTemp: Array<Task> = [].concat(scenario.tasks);
    let listStatusGraph: Array<{ idTask: number, status: number, nextTask: number }> = [];
    const instanceFind: Instance = this.listCurrentInstance.find(instanceTest => instanceTest.scenario_id === scenario.id);
    if(!instanceFind) {

      return listStatusGraph;

    }
    instanceFind.logs.forEach((log: Log) => {

      const currentTask: Task = tasksTemp.find(task => task.label === log.label);
      tasksTemp.splice(tasksTemp.indexOf(currentTask), 1);
      if(!log.status) {

        listStatusGraph.push({ idTask: currentTask.inner_scenario_id, status: 1, nextTask: -1 });
        return;

      }
      const status: number = (log.status === 200) ? 2 : 3;
      if(status === 2) {

        listStatusGraph.push({ idTask: currentTask.inner_scenario_id, status: status, nextTask: currentTask.success_id });

      } else {

        listStatusGraph.push({ idTask: currentTask.inner_scenario_id, status: status, nextTask: currentTask.error_id });

      }

    });
    return listStatusGraph;

  }

  refreshLogsScenario(idScenario: number) {

    const index: number = this.listCurrentInstance.findIndex(instance => instance.scenario_id === idScenario);
    if(index > -1) {

      this.deleteInstance(this.listCurrentInstance[index].id);

    }

  }

  private addInstance(newInstance: Instance) {

    this.deleteInstance(newInstance.id);
    this.listCurrentInstance.push(newInstance);

  }

  private deleteInstance(idInstance: number) {

    const currentInstance: number = this.listCurrentInstance.findIndex((instance: Instance) => instance.id === idInstance);
    if(currentInstance > -1) {

      this.listCurrentInstance.splice(currentInstance, 1);

    }

  }

}
