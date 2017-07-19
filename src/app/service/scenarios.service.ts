import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isUndefined } from "util";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { environment } from "../../environments/environment";

import { Scenario } from "../front-ops";
import { Router } from "@angular/router";

@Injectable()
export class ScenariosService {

  // list of all scenarios available
  private listScenarios: Array<Scenario>;

  // subject and observable to push notification when instance end
  private errorScenarioSource: Subject<Observable<string>> = new Subject<Observable<string>>();
  public errorScenarioObs: Observable<Observable<string>> = this.errorScenarioSource.asObservable();

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
  public putScenario(scenario: Scenario) {

    return this.http.put(environment.urlPutScenario, { scenario })
      .subscribe(
        () => {

          this.refreshAllScenarios();
          this.router.navigate(["/scenarios/"]);

        },
        error => {

          this.errorScenarioSource.next(ScenariosService.handleError(error));

    });

  }

  // post scenario in param
  public postScenario(scenario: Scenario) {

    return this.http.post(environment.urlPostScenario.replace("id", scenario.id), { scenario })
      .subscribe(
        () => {

        this.refreshAllScenarios();
        this.router.navigate(["/scenarios/", scenario.id]);

        },
        error => {

          this.errorScenarioSource.next(ScenariosService.handleError(error));

    });

  }

  // refresh listScenario after call update on Scenarios table on database
  private refreshAllScenarios() {

    this.listScenarios = [];

  }

  constructor(private http: Http,
              private router: Router) { }

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
