import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Action } from "../front-ops";
import { isUndefined } from "util";

@Injectable()
export class ActionsService {

  // list of all actions available
  private listActions: Array<Action> = [];

  // return observable list of all actions
  getAllActions(): Observable<Action[]> {

    if(this.listActions && this.listActions.length > 0) {

      return Observable.of(this.listActions);

    }
    return this.http.get(environment.urlGetAllActions)
      .map(response => {

        this.listActions = response.json() || { };
        return this.listActions;

      })
      .catch(error => ActionsService.handleError(error, "getAllActions: "));

  }

  // return observable action associated to action ID argument
  getAction(actionId: number): Observable<Action> {

    return this.http.get(environment.urlGetAction.replace("id", actionId))
      .map(response => {

        return response.json() || { };

      })
      .catch(error => ActionsService.handleError(error, "getScenario: "));

  }

  // return observable label of one action id in params
  getLabelAction(idAction: number): Observable<string> {

    return this.getAllActions()
      .map(response => {

        const actionFind: Action = response.find((action: Action) => action.id === idAction);
        if (isUndefined(actionFind)) {

          return "Not Exist";

        }
        return actionFind.label;

    });

  }

  // refresh listActions after call update on Actions table on database
  refreshAllActions() {

    this.listActions = [];

  }

  // execute one action on back and return response message
  executeAction(actionId: number, args: string): Observable<string> {

    return this.http.post(environment.urlExecuteAction.replace("id", actionId), {args: args})
      .map(response => {

        return response.json().message || "";

      })
      .catch(error => ActionsService.handleError(error, "executeAction: "));

  }

  constructor(private http: Http) { }

  private static handleError (error: Response | any, functionName: string) {

    let errMsg: string = "ActionsService: " + functionName;
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
