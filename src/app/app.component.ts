import { Component } from "@angular/core";

import { PushNotificationsService } from "./notification-module/push-notifications/services/push-notifications.service";
import { InstancesService } from "./service/instances.service";
import { ScenariosService } from "./service/scenarios.service";

@Component({

  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],

}) export class AppComponent {

  notify(idScenario: number) {

    const options: any = {

      body: "Le scenario numero " + idScenario + " est terminé",
      icon: "../assets/Phil_the_Maid.jpg"

    };
    this._pushNotifications.create("Front Ops", options).subscribe();

  }

  notifyError(error: string) {

    const options: any = {

      body: error,
      icon: "../assets/evil-minion.jpg"

    };
    this._pushNotifications.create("Front Ops", options).subscribe();

  }

  constructor(private instancesService: InstancesService,
              private scenariosService: ScenariosService,
              private _pushNotifications: PushNotificationsService) {

    this.instancesService.terminateInstanceScenarioObs.subscribe(
      response => {

        if(typeof response === "number") {

          this.notify(response);

        } else {

          response.subscribe(() => { return; }, error => this.notifyError(error));

        }

    });

    this.scenariosService.errorScenarioObs.subscribe(
      response => {

        response.subscribe(() => { return; }, error => this.notifyError(error));

    });

    this.instancesService.setIntervalRequeteObservable();

  }

}
