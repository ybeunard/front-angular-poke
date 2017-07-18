import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isUndefined } from "util";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";

import { Scenario } from "../front-ops";

@Injectable()
export class ScenariosService {

  // list of all scenarios available
  private listScenarios: Array<Scenario>;

  // return observable list of all scenarios
  getAllScenarios(): Observable<Array<Scenario>> {

    if(this.listScenarios && this.listScenarios.length > 0) {

      return Observable.of(this.listScenarios);

    }
    return this.http.get(environment.urlGetAllScenario)
      .map(response => {

        if(response.status === 204) {

          return [];

        }
        this.listScenarios = response.json().scenarios || { };
        return this.listScenarios;

      })
      .catch(error => ScenariosService.handleError(error, "getAllScenarios: "));

  }

  // refresh listScenario after call update on Scenarios table on database
  refreshAllScenarios() {

    this.listScenarios = [];

  }

  // return observable scenario associated to scenario ID argument
  getScenario(scenarioId: number): Observable<Scenario> {

    return this.http.get(environment.urlGetScenario.replace("id", scenarioId))
      .map(response => {

        return response.json() || { };

      })
      .catch(error => ScenariosService.handleError(error, "getScenario: "));

  }

  // return observable label of one module id in params
  getLabelScenario(idScenario: number): Observable<string> {

    return this.getScenario(idScenario)
      .map(response => {

        if(isUndefined(response)) {

          return "Not Exist";

        }
        return response.label;

      });

  }

  putScenario(scenario: Scenario): Observable<any> {

    return this.http.put(environment.urlPutScenario, { scenario })
      .catch(error => ScenariosService.handleError(error, "putScenario: "));

  }

  postScenario(scenario: Scenario): Observable<any> {

    return this.http.post(environment.urlPostScenario.replace("id", scenario.id), { scenario })
      .catch(error => ScenariosService.handleError(error, "postScenario: "));

  }

  constructor(private http: Http) { }

  private static handleError (error: Response | any, functionName: string) {

    let errMsg: string = "ScenariosScervice: " + functionName;
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
