import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { isUndefined } from "util";

import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Action, Module, Task } from "../front-ops";

@Injectable()
export class ModulesService {

  // list of all modules available
  private listModules: Array<Module> = [];

  // return observable list of all modules with a visibility set at false
  public getAllModules(): Observable<Array<Module>> {

    if(this.listModules && this.listModules.length > 0) {

      return Observable.of(this.listModules);

    }
    return this.http.get(environment.urlGetAllModules)
      .map(response => {

        if(response.status === 204) {

          return [];

        }
        const responseModules: Array<any> = response.json().modules || { };
        responseModules.forEach((module: any) => {

          this.listModules.push({ id: module.id, label: module.label, actions: module.actions, visibility: false});

        });
        return this.listModules;

      })
      .catch(error => ModulesService.handleError(error));

  }

  // return observable label of one module id in params
  public getLabelModule(idModule: number): Observable<string> {

    return this.getAllModules()
      .map(response => {

        const moduleFind: Module = response.find((module: Module) => module.id === idModule);
        if(isUndefined(moduleFind)) {

          return "Not Exist";

        }
        return moduleFind.label;

      });

  }

  // refresh listModules after call update on Modules and Actions table on database
  private refreshAllModules() {

    this.listModules = [];

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
