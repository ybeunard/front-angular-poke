import { enableProdMode } from '@angular/core';
import { getTranslationProviders } from './i18n-providers';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {

  enableProdMode();

}

getTranslationProviders().then(providers => {

  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);

});
