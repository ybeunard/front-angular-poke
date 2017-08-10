import { Component, Input, OnInit } from "@angular/core";

import { UnitTasksService } from "../service/unit-tasks.service";

import { UnitTask } from "../front-ops";

@Component({
  selector: "app-unit-tasks-list",
  templateUrl: "./unit-tasks-list.component.html",
  styleUrls: ["./unit-tasks-list.component.scss"]
})
export class UnitTasksListComponent implements OnInit {

  private actionId: number;

  filter: string = "";

  listUnitTasks: Array<UnitTask> = [];

  @Input()
  set action(action: number) {

    this.actionId = action || null;

  }

  private loadUnitTask() {

    this.unitTasksService.getAllUnitTasks()
      .subscribe(
        response => {

          this.listUnitTasks = response;

    });

  }

  constructor(private unitTasksService: UnitTasksService) { }

  ngOnInit() {

    this.loadUnitTask();

  }

}
