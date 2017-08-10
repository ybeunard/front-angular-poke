import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

type Permission = "denied" | "granted" | "default";

interface IPushNotification {

  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: "auto" | "ltr" | "rtl";
  lang?: string;
  vibrate?: number[];

}

declare const Notification: any;

@Injectable()
export class PushNotificationsService {

    permission: Permission;

    constructor() {

      this.permission = PushNotificationsService.isSupported() ? Notification.permission : "denied";
      if(this.permission === "default") {

        PushNotificationsService.requestPermission().then((status: Permission) => {

          this.permission = status;

        });

      }

    }

    private static requestPermission(): Promise<any> {

        if (PushNotificationsService.isSupported()) {

          return Notification.requestPermission();

        }

    }

    private static isSupported(): boolean {

        return "Notification" in window;

    }

    private pushNotification(notification: Notification, link: string) {

      if(link) {

        notification.onclick = (event: any) => {

          event.preventDefault();
          window.open(link, "_blank");

        };

      }
      setTimeout(notification.close.bind(notification), 5000);

    }

    public create(title: string, options: IPushNotification, link: string): Observable<any> {

        return new Observable((obs: any) => {

            if (!PushNotificationsService.isSupported()) {

                obs.error("Notifications are not available in this environment");
                obs.complete();

            }

            switch (this.permission) {

              case "denied":

                obs.complete();
                break;

              case "granted" :

                this.pushNotification(new Notification(title, options), link);
                break;

              default:

                PushNotificationsService.requestPermission().then((status: Permission) => {

                  this.permission = status;
                  if(status === "granted") {

                    this.pushNotification(new Notification(title, options), link);

                  } else {

                    obs.complete();

                  }

                });

            }

        });

    }

}
