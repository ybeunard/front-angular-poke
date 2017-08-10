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
  public getAllActions(): Observable<Array<Action>> {

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
  public putAction(action: Action): Observable<string> {

    return this.http.put(environment.urlPutAction.replace("module_id", action.module_id), { action })
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable with the return of the post request
  public postAction(action: Action): Observable<string> {

    return this.http.post(environment.urlPostAction
      .replace("module_id", action.module_id)
      .replace("id", action.id), { action })
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => ActionsService.handleError(error));

  }

  // return observable with the return of the delete request
  public deleteAction(actionId: number): Observable<string> {

    return this.http.delete(environment.urlDeleteAction.replace("id", actionId))
      .map(response => {

        ActionsService.refreshAllActions();
        ModulesService.refreshAllModules();
        if(isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

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
