import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isNullOrUndefined } from "util";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

import { ModulesService } from "./modules.service";

import { Action } from "../front-ops";

@Injectable()
export class ActionsService {

  // list of all actions available
  private static listActions: Array<Action> = [];

  // return observable list of all actions
  public getAllActions(): Observable<Action[]> {

    if(ActionsService.listActions && ActionsService.listActions.length > 0) {

      return Observable.of(ActionsService.listActions);

    }
    return this.http.get(environment.urlGetAllActions)
      .map(response => {

        if(response.status === 204) {

          return [];

        }
        ActionsService.listActions = response.json().actions || [];
        return ActionsService.listActions;

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

  // return observable with the return of the put request
  public putAction(action: Action, moduleId: number): Observable<any> {

    return this.http.put(environment.urlPutAction.replace("module_id", moduleId), { action })
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        return response;

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable with the return of the post request
  public postAction(action: Action, moduleId: number): Observable<any> {

    return this.http.post(environment.urlPostAction
      .replace("module_id", moduleId)
      .replace("id", action.id), { action })
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        return response;

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable with the return of the delete request
  public deleteAction(actionId: number): Observable<any> {

    return this.http.delete(environment.urlDeleteAction.replace("id", actionId))
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        return response;

      })
      .catch(error => ActionsService.handleError(error));

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
  private static refreshAllActions() {

    ActionsService.listActions = [];

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
