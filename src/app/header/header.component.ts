import {Component, NgZone} from "@angular/core";
import { getTranslationProviders } from "../../i18n-providers";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "../app.module";

@Component({

  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]

}) export class HeaderComponent {

  locale: string;
  isLocaleLanguage(language: string) {

    return (language === this.locale);

  };
  changeLanguage(language: string) {

    document["locale"] = language;
    this.locale = language;
    this.zone.runOutsideAngular(() => {

      getTranslationProviders().then(providers => {

        const options: any = { providers };
        platformBrowserDynamic().bootstrapModule(AppModule, options);

      });

    });

  };
  constructor(private zone: NgZone) {

    this.locale =  document["locale"] as string;

  }

}
