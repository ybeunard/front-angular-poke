import { Observable } from "rxjs/Observable";

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

export class PushNotificationsServiceMock {

  public create(title: string, options: IPushNotification, link: string): Observable<any> {

    return new Observable((obs: any) => {

      console.log(title + options.body + link);
      obs.complete();

    });

  }

}
