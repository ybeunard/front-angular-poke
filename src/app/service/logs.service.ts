import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Log, Instance, Scenario, Task } from "../front-ops";
import { isNullOrUndefined } from "util";

@Injectable()
export class LogsService {

  // list of all instances running or runned available
  private listInstances: Array<Instance> = [];

  // subject and observable to transmit all change on console to component
  private instanceChangeSource: Subject<number> = new Subject<number>();
  public instanceChange: Observable<number> = this.instanceChangeSource.asObservable();

  // add new instance
  private addInstance(newInstance: Instance) {

    this.deleteInstance(newInstance.id);
    this.listInstances.push(newInstance);

  }

  // set all logs status in progresse to fail
  public crashInstance(idInstance: number) {

    const instanceFindIndex: number = this.listInstances.findIndex((instanceTest: Instance) => instanceTest.id === idInstance);
    this.listInstances[instanceFindIndex]
      .logs.forEach((log: Log) => {

        const logIndex: number = this.listInstances[instanceFindIndex].logs.indexOf(log);
        if(isNullOrUndefined(log.status)) {

          this.listInstances[instanceFindIndex].logs[logIndex].status = 500;

        }

    });

  }

  // delete instance in param
  private deleteInstance(idInstance: number) {

    const instanceFindIndex: number = this.listInstances.findIndex((instanceTest: Instance) => instanceTest.id === idInstance);
    if(instanceFindIndex > -1) {

      this.listInstances.splice(instanceFindIndex, 1);

    }

  }

  // get log of scenario in param
  public getLogsScenario(idScenario: number): Array<Log> {

    const instanceFind: Instance = this.listInstances.find((instanceTest: Instance) => instanceTest.scenario_id === idScenario);
    if(instanceFind) {

      return instanceFind.logs;

    }
    return [];

  }

  // return array of task status of the scenario in param
  public getStatusGraph(scenario: Scenario): Array<{ idTask: number, status: number, nextTask: number }> {

    let tasksTemp: Array<Task> = [].concat(scenario.tasks);
    let listStatusGraph: Array<{ idTask: number, status: number, nextTask: number }> = [];
    const instanceFind: Instance = this.listInstances.find(instanceTest => instanceTest.scenario_id === scenario.id);
    if(!instanceFind) {

      return listStatusGraph;

    }
    instanceFind.logs.forEach((log: Log) => {

      const taskFind: Task = tasksTemp.find(taskTest => taskTest.label === log.label);
      tasksTemp.splice(tasksTemp.indexOf(taskFind), 1);
      if(!log.status) {

        listStatusGraph.push({ idTask: taskFind.inner_scenario_id, status: 1, nextTask: -1 });
        return;

      }
      const status: number = (log.status === 200) ? 2 : 3;
      if(status === 2) {

        listStatusGraph.push({ idTask: taskFind.inner_scenario_id, status: status, nextTask: taskFind.success_id });

      } else {

        listStatusGraph.push({ idTask: taskFind.inner_scenario_id, status: status, nextTask: taskFind.error_id });

      }

    });
    return listStatusGraph;

  }

  // recover instance and push an observable to prevent scenario component
  public recoverLogsInstance(instance: Instance) {

    this.addInstance(instance);
    this.instanceChangeSource.next(instance.scenario_id);

  }

  // refresh all logs of scenario in param
  public refreshLogsScenario(idScenario: number) {

    const listInstancesFilter: Array<Instance> = this.listInstances.filter(instanceTest => instanceTest.scenario_id === idScenario);
    listInstancesFilter.forEach(instance => {

      this.deleteInstance(instance.id);

    });

  }

}
