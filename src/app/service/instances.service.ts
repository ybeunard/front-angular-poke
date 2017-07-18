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

  intervalRequeteLog: number = environment.intervalRequeteLog;

  // subject and observable to transmit all change of status to graph sigma
  private terminateInstanceScenarioSource: Subject<number | Observable<string>> = new Subject<number | Observable<string>>();
  public terminateInstanceScenarioObs: Observable<number | Observable<string>> = this.terminateInstanceScenarioSource.asObservable();

  // run new instance scenario and store his ID in the browser cache
  runInstanceScenario(idScenario: number) {

    this.http.get(environment.urlExecuteInstanceScenario.replace("id", idScenario))
      .subscribe(
        response => {

          let cache: Array<{ idInstance: string, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
          if(!cache) {

            cache = [];

          }
          cache.push({ idInstance: response.json().message, idScenario: idScenario });
          localStorage.setItem(environment.keyCacheInstanceRunning, JSON.stringify(cache));

      },
      error => {

        this.terminateInstanceScenarioSource.next(InstancesService.handleError(error, "runInstanceScenario: "));

      });

  }

  checkInstanceScenarioRunning(idScenario: number): boolean {

    const cache: Array<{ idInstance: string, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
    if(isNullOrUndefined(cache)) {

      return false;

    }
    const index: number = cache.findIndex(element => element.idScenario === idScenario);
    if(index === -1) {

      return false;

    }
    return true;

  }

  setIntervalRequeteObservable() {

    IntervalObservable.create(this.intervalRequeteLog)
      .subscribe(
      () => {

         const cache: Array<{ idInstance: string, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
         if(cache && cache.length > 0) {

           this.checkInstanceRunning(cache);

         }

    });

  }

  private checkInstanceRunning(idInstancesScenarios: Array<{ idInstance: string, idScenario: number }>) {

    idInstancesScenarios.forEach((idInstanceScenario) => {

      this.http.get(environment.urlGetInstance.replace("id", idInstanceScenario.idInstance))
        .subscribe(
          response => {

            this.logsServices.recoverLogsInstance(response.json());
            if(response.json().status === "terminated") {

              this.terminateInstanceScenario(idInstanceScenario.idInstance, idInstanceScenario.idScenario);

            }

          });

    });

  }

  private terminateInstanceScenario(idInstance: string, idScenario: number) {

    const cache: Array<{ idInstance: string, idScenario: number }> = JSON.parse(localStorage.getItem(environment.keyCacheInstanceRunning));
    const index: number = cache.indexOf({ idInstance: idInstance, idScenario: idScenario });
    cache.splice(index, 1);
    localStorage.setItem(environment.keyCacheInstanceRunning, JSON.stringify(cache));
    this.terminateInstanceScenarioSource.next(idScenario);

  }

  constructor(private http: Http,
              private logsServices: LogsService) {  }

  private static handleError (error: Response | any, functionName: string) {

    let errMsg: string = "InstancesService: " + functionName;
    if (error instanceof Response) {

      const body: any = error.json() || "";
      const err: string = body.error || JSON.stringify(body);
      errMsg += `${error.status} - ${error.statusText || ""} ${err}`;

    } else {

      errMsg += error.message ? error.message : error.toString();

    }
    return Observable.throw(errMsg);

  }

}
