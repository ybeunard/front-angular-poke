import { Component, EventEmitter, Output, Type } from "@angular/core";

import { ActionsListComponent } from "../actions-list/actions-list.component";

@Component({

  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]

}) export class ToolbarComponent {

  @Output() changeCore: EventEmitter<Type<any>> = new EventEmitter<Type<any>>();
  classes: any = {

    "ActionsListComponent": ActionsListComponent

  };
  updateCore(component: string) {

    const componentType: Type<any> = this.classes[component];
    this.changeCore.emit(componentType);

  }

}
