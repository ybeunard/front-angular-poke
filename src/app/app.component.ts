import { Component } from "@angular/core";

import { PushNotificationsService } from "./service/push-notifications.service";

@Component({

  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],

}) export class AppComponent {

  notify(text: string, link?: string) {

    const options: any = {

      body: text,
      icon: "../assets/Phil_the_Maid.jpg"

    };
    this._pushNotifications.create("Front Ops", options, link).subscribe();

  }

  notifyError(error: string, link?: string) {

    const options: any = {

      body: error,
      icon: "../assets/evil-minion.jpg"

    };
    this._pushNotifications.create("Front Ops", options, link).subscribe();

  }

  constructor(private _pushNotifications: PushNotificationsService) { }

}
