import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Module } from "../front-ops";

@Injectable()
export class ModulesService {

  listModules: Array<Module>;

  getAllModules(): Observable<Array<Module>> {

    if(this.listModules) {

      return Observable.of(this.listModules);

    }
    return this.http.get(environment.urlModule)
      .map(response => {

        this.listModules = response.json().modules || { };
        return this.listModules;

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

  constructor(private http: Http) { }

}
