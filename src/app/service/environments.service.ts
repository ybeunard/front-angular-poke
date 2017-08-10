import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { Environment, SaltAttribute } from "../front-ops";

import { urlGetAllEnvironment, urlGetAllSaltAttribute } from "./environments.service.mock";

@Injectable()
export class EnvironmentsService {

  listEnvironment: Array<Environment>;

  listSaltAttributes: Array<SaltAttribute>;

  // return observable list of all environments
  public getAllSaltAttribute(): Observable<Array<SaltAttribute>> {

    if(this.listSaltAttributes && this.listSaltAttributes.length > 0) {

      return Observable.of(this.listSaltAttributes);

    }
    return Observable.of(urlGetAllSaltAttribute)
      .map(response => {

        this.listSaltAttributes = response || [];
        return this.listSaltAttributes;

      })
      .catch(error => EnvironmentsService.handleError(error));

  }

  // return observable list of all environments
  public getAllEnvironments(): Observable<Array<Environment>> {

    if(this.listEnvironment && this.listEnvironment.length > 0) {

      return Observable.of(this.listEnvironment);

    }
    return Observable.of(urlGetAllEnvironment)
      .map(response => {
        this.listEnvironment = response || [];
        return this.listEnvironment;

      })
      .catch(error => EnvironmentsService.handleError(error));

  }

  // return observable list of all environments sort by category
  public getAllEnvironmentsSortByCategory(): Observable<Array<{ category: string, environments: Array<Environment> }>> {

    return this.getAllEnvironments()
      .map(response => {

        return this.sortListEnvironmentByCategory(response);

      });

  }

  // return list of environment sort by category
  private sortListEnvironmentByCategory(listUnsort: Array<Environment>): Array<{ category: string, environments: Array<Environment> }> {

    let listSort: Array<{ category: string, environments: Array<Environment> }> = [];
    listUnsort.forEach(environment => {

      const environmentFindIndex: any = listSort.findIndex(environmentTest => environmentTest.category === environment.category);
      if(environmentFindIndex === -1) {

        listSort.push({ category: environment.category, environments: [environment] });

      } else {

        listSort[environmentFindIndex].environments.push(environment);

      }

    });
    return listSort;

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
