import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IPushNotification, Permission } from "../interfaces/push-notification.type";

declare const Notification: any;

@Injectable()
export class PushNotificationsService {

    permission: Permission;

    constructor() {

        this.permission  = this.isSupported() ? Notification.permission : "denied";

    }

    requestPermission() {

        if ("Notification" in window) {

          Notification.requestPermission((status: any) => this.permission = status);

        }

    }

    isSupported() {

        return "Notification" in window;

    }

    create(title: string, options?: IPushNotification): any {

        return new Observable((obs: any) => {

            if (!("Notification" in window)) {

                obs.error("Notifications are not available in this environment");
                obs.complete();

            }

            if (this.permission !== "granted") {

                obs.error("The user hasn't granted you permission to send push notifications");
                obs.complete();

            }

            const notification: any = new Notification(title, options);

            notification.onshow = (e: any) => obs.next({notification: notification, event: e});
            notification.onclick = (e: any) => obs.next({notification: notification, event: e});
            notification.onerror = (e: any) => obs.error({notification: notification, event: e});
            notification.onclose = () => obs.complete();

        });

    }

}
