import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Action } from "../front-ops";
import { ModulesService } from "./modules.service";

@Injectable()
export class ActionsService {

  getAllActions(): Observable<Action[]> {

    return this.http.get(environment.urlAction)
      .map(response => {

        return response.json().actions;

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
  getListActionsSortByModule(): Observable<{ moduleName: string, actions: Action[], visibility: boolean }[]> {

    return Observable
      .forkJoin([
        this.getAllActions(),
        this.modulesService.getAllModules()
      ]).map(([actions, modules]) => {

        return this.sortActionsByMdule(actions, modules);

      })
      .catch(this.handleError);

  }
  sortActionsByMdule(actions: any, modules: any): Array<{ moduleName: string, actions: Action[], visibility: boolean }> {

    const listActionsSortByModule: Array< { moduleName: string, actions: Action[], visibility: boolean } > = [];
    modules.forEach( (module) => {

      const listActionsForOneModule: Array<Action> = [];
      actions.forEach( (action) => {

        if ( action.module_id === module.id ) {

          listActionsForOneModule.push(action);

        }

      });
      listActionsSortByModule.push( { moduleName: module.name, actions: listActionsForOneModule, visibility: false });

    });
    return listActionsSortByModule;

  }
  constructor(private http: Http, private modulesService: ModulesService) { }

}
