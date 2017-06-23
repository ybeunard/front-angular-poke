import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { ModulesService } from "./modules.service";

import {Action, Module} from "../front-ops";

@Injectable()
export class ActionsService {

  listActions: Array<Action>;

  getAllActions(): Observable<Action[]> {

    if(this.listActions) {

      return Observable.of(this.listActions);

    }
    return this.http.get(environment.urlAction)
      .map(response => {

        this.listActions = response.json().actions || { };
        return this.listActions;

      })
      .catch(this.handleError);

  }

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {

      const body: any = error.json() || "";
      const err: string = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;

    } else {

      errMsg = error.message ? error.message : error.toString();

    }
    return Observable.throw(errMsg);

  }

  getListActionsSortByModule(): Observable<{ module: Module, actions: Action[], visibility: boolean }[]> {

    return Observable
      .forkJoin([
        this.getAllActions(),
        this.modulesService.getAllModules()
      ]).map(([actions, modules]) => {

        return this.sortActionsByModule(actions, modules);

      })
      .catch(this.handleError);

  }

  sortActionsByModule(actions: any, modules: any): Array<{ module: Module, actions: Action[], visibility: boolean }> {

    const listActionsSortByModule: Array< { module: Module, actions: Action[], visibility: boolean } > = [];
    modules.forEach( (module) => {

      const listActionsForOneModule: Array<Action> = [];
      actions.forEach( (action) => {

        if ( action.module_id === module.id ) {

          listActionsForOneModule.push(action);

        }

      });
      listActionsSortByModule.push( { module: module, actions: listActionsForOneModule, visibility: false });

    });
    return listActionsSortByModule;

  }

  constructor(private http: Http, private modulesService: ModulesService) { }

}
