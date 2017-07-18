import { Component, NgZone, OnInit } from "@angular/core";
import { getTranslationProviders } from "../../i18n-providers";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router, NavigationEnd } from "@angular/router";

import { AppModule } from "../app.module";

import { ActionsService } from "../service/actions.service";
import { ModulesService } from "../service/modules.service";
import { ScenariosService } from "../service/scenarios.service";

@Component({

  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]

}) export class HeaderComponent implements OnInit {

  locale: string;
  urlNav: Array<{display: string, url: string }> = [];

  // Error Messages
  errorMessageTranslationProvidersError: string = "";

  isLocaleLanguage(language: string) {

    return (language === this.locale);

  };

  changeLanguage(language: string) {

    document["locale"] = language;
    this.locale = language;
    this.zone.runOutsideAngular(
      () => {

        getTranslationProviders().then(
          providers => {

            const options: any = {providers};
            platformBrowserDynamic().bootstrapModule(AppModule, options);

          },
          error => {

            this.errorMessageTranslationProvidersError = error;

        });

    });

  };

  onClickUrl(url: string) {

    this.router.navigate([url]);

  }

  createUrl(url: string): string {

    if(this.urlNav.length === 0) {

      return "/" + url;

    }
    return this.urlNav[this.urlNav.length - 1].url + "/" + url;

  }

  browseUrl(urlSplit: Array<string>, path: string, index: number) {

    const url: string = urlSplit[index];
    const nextUrl: string = urlSplit[index + 1];
    switch(url) {

      case "":
        if(nextUrl) {

          this.browseUrl(urlSplit, path, index + 1);

        }
        break;

      case "actions" :
        this.urlNav.push({display: url, url: this.createUrl(url)});
        if(nextUrl) {

          this.browseUrl(urlSplit, "actions", index + 1 );

        }
        break;

      case "scenarios":
        this.urlNav.push({display: url, url: this.createUrl(url)});
        if(nextUrl) {

          this.browseUrl(urlSplit, "scenarios", index + 1 );

        }
        break;

      case "add" :
        this.urlNav.push({display: url, url: this.createUrl(url)});
        if(nextUrl) {

          this.browseUrl(urlSplit, "add", index + 1 );

        }
        break;

      case "update":
        switch(path) {

          case "scenarioId":
            this.urlNav.push({display: url, url: this.createUrl(url)});
            break;

          default:

        }
        break;

      default:
        const id: number = parseInt(url, 10);
        switch(path) {

          case "actions":
            this.modulesService.getLabelModule(id).subscribe(response => {

              if(response === "Not Exist") {

                this.urlNav.push({display: response, url: this.createUrl("")});
                return;

              }
              this.urlNav.push({display: response, url: this.createUrl(url)});
              if(nextUrl) {

                this.browseUrl(urlSplit, "moduleId", index + 1 );

              }

            });
            break;

          case "moduleId":
            this.actionsService.getLabelAction(id).subscribe(response => {

              if(response === "Not Exist") {

                this.urlNav.push({display: response, url: this.createUrl("")});
                return;

              }
              this.urlNav.push({display: response, url: this.createUrl(url)});
              if(nextUrl) {

                this.browseUrl(urlSplit, "actionId", index + 1 );

              }

            });
            path = "actionId";
            break;

          case "scenarios":
            this.scenariosService.getLabelScenario(id).subscribe(response => {

              if(response === "Not Exist") {

                this.urlNav.push({display: response, url: this.createUrl("")});
                return;

              }
              this.urlNav.push({display: response, url: this.createUrl(url)});
              if(nextUrl) {

                this.browseUrl(urlSplit, "scenarioId", index + 1 );

              }

            });
            break;

          default:

        }

    }

  }

  constructor(private zone: NgZone,
              private router: Router,
              private actionsService: ActionsService,
              private modulesService: ModulesService,
              private scenariosService: ScenariosService) { }

  ngOnInit() {

    this.errorMessageTranslationProvidersError = "";
    this.locale =  document["locale"] as string;
    this.router
      .events
      .subscribe(
        event => {

          if (event instanceof NavigationEnd) {

            this.urlNav = [];
            const urlSplit: Array<string> = event.url.split("/");
            this.browseUrl(urlSplit, "", 0);

          }

      });

  }

}
