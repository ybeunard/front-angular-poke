import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { Task } from '../front-ops';
import {mockUrlTask} from './tasks.service.mock';

@Injectable()
export class TaskService {

  listTasks: Array<Task>;
  sigmaNodesDiagram: { nodes: Array<{ id: number, label: string, x: number, y: number, size: number }>, edges: Array<{ id: number, source: number, target: number }> };
  edgeCount: number;

  getSigmaGraph(): any {

    if(this.sigmaNodesDiagram) {

      return this.sigmaNodesDiagram;

    }
    const model = mockUrlTask;
    this.extractModelTasks(model);
    return this.sigmaNodesDiagram;

  }

  extractModelTasks(model: any) {

    let starterTask: number = model.starter;
    this.edgeCount = 0;
    this.sigmaNodesDiagram = { nodes: [], edges: [] }
    this.extractTask(model, model.tasksById[starterTask]);

  }

  extractTask(model: any, task: Task) {

    this.sigmaNodesDiagram.nodes.push({ id: task.id, label: task.action.label, x: task.x, y: task.y, size: task.size });
    if(task.success > -1) {

      this.sigmaNodesDiagram.edges.push({ id: this.edgeCount, source: task.id, target: task.success });
      this.edgeCount++;
      this.extractTask(model, model.tasksById[task.success]);

    }
    if(task.error > -1) {

      this.sigmaNodesDiagram.edges.push({ id: this.edgeCount, source: task.id, target: task.error });
      this.edgeCount++;
      this.extractTask(model, model.tasksById[task.error]);

    }

  }

}
