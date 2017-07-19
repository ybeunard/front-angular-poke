import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { isNullOrUndefined } from "util";

import { environment } from "../../environments/environment";

import { LogsService } from "./logs.service";

@Injectable()
export class InstancesService {

  // interval between two requete log
  private intervalRequeteLog: number = environment.intervalRequeteLog;

  // subject and observable to push notification when instance end
  private terminateInstanceScenarioSource: Subject<number | Observable<string>> = new Subject<number | Observable<string>>();
  public terminateInstanceScenarioObs: Observable<number | Observable<string>> = this.terminateInstanceScenarioSource.asObservable();

  // check if all instance running,
  // if they are terminated, delete it from the cache
  private checkInstanceRunning(idInstancesScenarios: Array<{ idInstance: number, idScenario: number }>) {

    idInstancesScenarios.forEach((idInstanceScenario) => {

      this.http.get(environment.urlGetInstance.replace("id", idInstanceScenario.idInstance))
        .subscribe(
          response => {

            this.logsServices.recoverLogsInstance(response.json());
            if(response.json().status === "terminated") {

              this.terminateInstanceScenario(idInstanceScenario.idInstance, idInstanceScenario.idScenario);

            }

          },
          error => {

            this.terminateInstanceScenario(idInstanceScenario.idInstance, idInstanceScenario.idScenario);
            this.logsServices.crashInstance(idInstanceScenario.idInstance);
            this.terminateInstanceScenarioSource.next(InstancesService.handleError(error));

      });

    });

  }

  // check in the cache if an instance of the scenario in param run
  public checkInstanceScenarioRunning(idScenario: number): boolean {

    const cache: Array<{ idInstance: number, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
    return !(isNullOrUndefined(cache) || cache.findIndex(elementCacheTest => elementCacheTest.idScenario === idScenario) === -1);

  }

  // run new instance scenario and store his ID in the browser cache
  public runInstanceScenario(idScenario: number) {

    this.http.get(environment.urlExecuteInstanceScenario.replace("id", idScenario))
      .subscribe(
        response => {

          let cache: Array<{ idInstance: number, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
          if(!cache) {

            cache = [];

          }
          cache.push({ idInstance: response.json().message, idScenario: idScenario });
          localStorage.setItem(environment.keyCacheInstanceRunning, JSON.stringify(cache));

        },
        error => {

          this.terminateInstanceScenarioSource.next(InstancesService.handleError(error));

    });

  }

  // set an intervalle observable to check if cache contains instance running
  public setIntervalRequeteObservable() {

    IntervalObservable.create(this.intervalRequeteLog)
      .subscribe(
      () => {

         const cache: Array<{ idInstance: number, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
         if(cache && cache.length > 0) {

           this.checkInstanceRunning(cache);

         }

    });

  }

  // delete of the cache an instance terminated
  private terminateInstanceScenario(idInstance: number, idScenario: number) {

    const cache: Array<{ idInstance: number, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
    const elementCacheIndex: number = cache.indexOf({ idInstance: idInstance, idScenario: idScenario });
    cache.splice(elementCacheIndex, 1);
    localStorage.setItem(environment.keyCacheInstanceRunning, JSON.stringify(cache));
    this.terminateInstanceScenarioSource.next(idScenario);

  }

  constructor(private http: Http,
              private logsServices: LogsService) {  }

  private static handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {

      const body: any = error.json() || "";
      errMsg = `${error.status} - ${body.message || ""}`;

    } else {

      errMsg = error.message ? error.message : error.toString();

    }
    return Observable.throw(errMsg);

  }

}
