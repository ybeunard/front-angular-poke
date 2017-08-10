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
  public getAllScenarios(): Observable<Array<Scenario>> {

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
      .catch(error => ScenariosService.handleError(error));

  }

  // return observable scenario associated to scenario ID argument
  public getScenario(scenarioId: number): Observable<Scenario> {

    return this.http.get(environment.urlGetScenario.replace("id", scenarioId))
      .map(response => {

        return response.json() || { };

      })
      .catch(error => ScenariosService.handleError(error));

  }

  // return observable label of one module id in params
  public getLabelScenario(idScenario: number): Observable<string> {

    return this.getScenario(idScenario)
      .map(response => {

        if(isUndefined(response)) {

          return "Not Exist";

        }
        return response.label;

    });

  }

  // put scenario in param
  public putScenario(scenario: Scenario): Observable<any> {

    return this.http.put(environment.urlPutScenario, { scenario })
      .map(response => {

        this.refreshAllScenarios();
        return response;

      })
      .catch(error => ScenariosService.handleError(error));

  }

  // post scenario in param
  public postScenario(scenario: Scenario): Observable<any> {

    return this.http.post(environment.urlPostScenario.replace("id", scenario.id), { scenario })
      .map(response => {

        this.refreshAllScenarios();
        return response;

      })
      .catch(error => ScenariosService.handleError(error));

  }

  // refresh listScenario after call update on Scenarios table on database
  private refreshAllScenarios() {

    this.listScenarios = [];

  }

  constructor(private http: Http) { }

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
