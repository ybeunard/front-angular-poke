import {Component, OnInit, NgZone} from '@angular/core';
import { getTranslationProviders } from '../../i18n-providers';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
}) export class HeaderComponent implements OnInit {

  locale: string;

  isLocaleLanguage(language) {

    return (language === this.locale);

  };

  changeLanguage(language) {

    document['locale'] = language;
    this.locale = language;
    this.zone.runOutsideAngular(() => {

      getTranslationProviders().then(providers => {

        const options = { providers };
        platformBrowserDynamic().bootstrapModule(AppModule, options);

      });

    });

  };

  constructor(private zone: NgZone) {

    this.locale =  document['locale'] as string;

  }

  ngOnInit() { }

}
