import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Http, Response } from "@angular/http";
import { isNullOrUndefined } from "util";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { Log, Instance, Scenario, Task } from "../front-ops";

import { environment } from "../../environments/environment";

@Injectable()
export class LogsService {

  // list of all instances running or runned available
  private listInstances: Array<Instance> = [];

  // interval between two requete log
  private intervalRequeteLog: number = environment.intervalRequeteLog;

  // subject and observable to transmit all changement on instance to component
  private instanceChangeSource: Subject<number> = new Subject<number>();
  public instanceChangeObs: Observable<number> = this.instanceChangeSource.asObservable();

  // subject and observable to transmit all changement on action to component
  private actionChangeSource: Subject<{ objectId: number, log: Log }> = new Subject<{ objectId: number, log: Log }>();
  public actionChangeObs: Observable<{ objectId: number, log: Log }> = this.actionChangeSource.asObservable();

  // subject and observable to push notification when object end
  public terminateSource: Subject<string | Observable<string>> = new Subject<string | Observable<string>>();
  public terminateObs: Observable<string | Observable<string>> = this.terminateSource.asObservable();

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

  private sendLog(log: any, idObject: number, pathCache: string, type: string) {

    switch(type) {

      case "Action":

        this.actionChangeSource.next({ objectId: idObject, log: log });
        if(log.status === "terminated") {

          this.terminateRunning(log.id, idObject, pathCache, type);

        }
        break;

      default:

    }

  }

  // check if all object running,
  private checkObjectRunning(url: any, pathCache: string, type: string) {

    const cache: Array<{ idLog: number, idObject: number, terminated: boolean }> = JSON.parse(localStorage.getItem(pathCache));
    if(isNullOrUndefined(cache)) {

      return;

    }
    cache.forEach((elementRunning) => {

      if(!elementRunning.terminated) {

        return;

      }
      this.http.get(url.replace("id", elementRunning.idLog))
        .subscribe(
          response => {

            this.sendLog(response.json(), elementRunning.idObject, pathCache, type);

          },
          error => {

            this.terminateRunning(elementRunning.idLog, elementRunning.idObject, pathCache, type);
            this.terminateSource.next(LogsService.handleError(error));

      });

    });

  }

  // check in the cache if an action in param run
  public checkActionRunning(idAction: number): boolean {

    const cache: Array<{ idLog: number, idObject: number, terminated: boolean }> = JSON.parse(localStorage.getItem(environment.keyCacheActionRunning));
    return !(isNullOrUndefined(cache) || cache.findIndex(elementCacheTest =>
      elementCacheTest.idObject === idAction &&
      elementCacheTest.terminated === true) === -1);

  }

  public getLogAction(idAction: number): Observable<Log> {

    const cache: Array<{ idLog: number, idObject: number, terminated: boolean }> = JSON.parse(localStorage.getItem(environment.keyCacheActionRunning));
    if(isNullOrUndefined(cache)) {

      return Observable.of(null);

    }
    const elementFind: any = cache.find(elementCacheTest => elementCacheTest.idObject === idAction);
    return this.http.get(environment.getLogAction.replace("id", elementFind.idLog))
      .map(response => response.json())
      .catch(error => LogsService.handleError(error));

  }

  // set an intervalle observable to check if cache contains object running
  public setIntervalRequeteObservable() {

    IntervalObservable.create(this.intervalRequeteLog)
      .subscribe(
        () => {

          this.checkObjectRunning(environment.getLogAction, environment.keyCacheActionRunning, "Action");

        });

  }

  // delete of the cache an object terminated
  private terminateRunning(idLog: number, idObject: number, pathCache: string, type: string) {

    const cache: Array<{ idLog: number, idObject: number, terminated: boolean }> = JSON.parse(localStorage.getItem(pathCache));
    const elementCacheIndex: number = cache.indexOf({ idLog: idLog, idObject: idObject, terminated: false });
    cache[elementCacheIndex].terminated = true;
    localStorage.setItem(pathCache, JSON.stringify(cache));
    this.terminateSource.next(type + " " + idObject);

  }

  constructor(private http: Http) {  }

  private static handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {

      const body: any = error.json().data || error.json();
      errMsg = `${error.status} - ${body.message || "Unreachable server"}`;

    } else {

      errMsg = error.message ? error.message : "Unreachable server";

    }
    return Observable.throw(errMsg);

  }

}
