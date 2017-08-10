import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { isNullOrUndefined } from "util";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

import { Task } from "../front-ops";

@Injectable()
export class TasksService {

  // list of all tasks available
  private static listTasks: Array<Task> = [];

  // return observable list of all tasks
  public getAllTasks(): Observable<Array<Task>> {

    if (TasksService.listTasks && TasksService.listTasks.length > 0) {

      return Observable.of(TasksService.listTasks);

    }
    return this.http.get(environment.urlGetAllTasks)
      .map(response => {

        if (response.status === 204) {

          return [];

        }
        TasksService.listTasks = response.json().tasks ? TasksService.jsonArrayToTasks(response.json().tasks) : [];
        return TasksService.listTasks;

      })
      .catch(error => TasksService.handleError(error));

  }

  // return observable with the return of the put request
  public putTask(task: Task): Observable<string> {

    return this.http.put(environment.urlPutTask, { task: TasksService.taskToJson(task) })
      .map(response => {

        TasksService.refreshAllTasks();
        if (isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => TasksService.handleError(error));

  }

  // return observable with the return of the post request
  public postTask(task: Task): Observable<string> {

    return this.http.post(environment.urlPostTask.replace("id", task.id), { task: TasksService.taskToJson(task) })
      .map(response => {

        TasksService.refreshAllTasks();
        if (isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => TasksService.handleError(error));

  }

  // return observable with the return of the delete request
  public deleteTask(taskId: number): Observable<string> {

    return this.http.delete(environment.urlDeleteTask.replace("id", taskId))
      .map(response => {

        TasksService.refreshAllTasks();
        if (isNullOrUndefined(response.json().data)) {

          return "";

        }
        return response.json().data.message || "";

      })
      .catch(error => TasksService.handleError(error));

  }

  // refresh listTasks after call update on Tasks table on database
  private static refreshAllTasks() {

    TasksService.listTasks = [];

  }

  private static taskToJson(task: Task): any {

    let jsonObject: any = {

      action: task.action, created_at: task.created_at, custom_label: task.custom_label, id: task.id,

      task_params: {

        params_dict: {args_map: {}, id: task.task_params.params_dict.id, target_map: {}},

        params_patterns: {

          args_pattern: task.task_params.params_patterns.args_pattern,
          target_pattern: task.task_params.params_patterns.target_pattern

        }

      }

    };
    task.task_params.params_dict.args_map.forEach((value, key) => {

      jsonObject.task_params.params_dict.args_map[key] = value;

    });
    task.task_params.params_dict.target_map.forEach(((value, key) => {

      jsonObject.task_params.params_dict.target_map[key] = value;

    }));
    return jsonObject;

  }

  private static jsonToTask(jsonObject: any): Task {

    let task: Task = {

      action: jsonObject.action, created_at: jsonObject.created_at, custom_label: jsonObject.custom_label, id: jsonObject.id,

      task_params: {

        params_dict: {args_map: new Map(), id: jsonObject.task_params.params_dict.id, target_map: new Map()},

        params_patterns: {

          args_pattern: jsonObject.task_params.params_patterns.args_pattern,
          target_pattern: jsonObject.task_params.params_patterns.target_pattern

        }

      }

    };
    Object.keys(jsonObject.task_params.params_dict.args_map).forEach((key) => {

      task.task_params.params_dict.args_map.set(key, jsonObject.task_params.params_dict.args_map[key]);

    });
    Object.keys(jsonObject.task_params.params_dict.target_map).forEach((key) => {

      task.task_params.params_dict.target_map.set(key, jsonObject.task_params.params_dict.target_map[key]);

    });
    return task;

  }

  private static jsonArrayToTasks(jsonObjects: Array<any>): Array<Task> {

    let tasks: Array<Task> = [];
    jsonObjects.forEach((jsonObject) => tasks.push(TasksService.jsonToTask(jsonObject)));
    return tasks;

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
