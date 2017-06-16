import { Component, Type } from "@angular/core";

@Component({

  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]

}) export class AppComponent {

  component: Type<any>;
  changeCore(component: Type<any>) {

    this.component = component;

  }

}
