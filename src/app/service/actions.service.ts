import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isNullOrUndefined } from "util";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

import { Action } from "../front-ops";

@Injectable()
export class ActionsService {

  // list of all actions available
  private listActions: Array<Action> = [];

  // return observable list of all actions
  public getAllActions(): Observable<Action[]> {

    if(this.listActions && this.listActions.length > 0) {

      return Observable.of(this.listActions);

    }
    return this.http.get(environment.urlGetAllActions)
      .map(response => {

        this.listActions = response.json() || { };
        return this.listActions;

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable action associated to action ID argument
  public getAction(actionId: number): Observable<Action> {

    return this.http.get(environment.urlGetAction.replace("id", actionId))
      .map(response => {

        return response.json() || { };

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable args of one action id in params
  public getArgsAction(idAction: number): Observable<string> {

    return this.getAllActions()
      .map(response => {

        const actionFind: Action = response.find((actionTest: Action) => actionTest.id === idAction);
        if (isNullOrUndefined(actionFind)) {

          return "";

        }
        return actionFind.args;

      });

  }

  // return observable label of one action id in params
  public getLabelAction(idAction: number): Observable<string> {

    return this.getAllActions()
      .map(response => {

        const actionFind: Action = response.find((actionTest: Action) => actionTest.id === idAction);
        if (isNullOrUndefined(actionFind)) {

          return "Not Exist";

        }
        return actionFind.label;

    });

  }

  // execute one action on back and return response message
  public executeAction(actionId: number, args: string): Observable<string> {

    return this.http.post(environment.urlExecuteAction.replace("id", actionId), {args: args})
      .map(response => {

        return response.json().message || "";

      })
      .catch(error => ActionsService.handleError(error));

  }

  // refresh listActions after call update on Actions table on database
  private refreshAllActions() {

    this.listActions = [];

  }

  constructor(private http: Http) { }

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
