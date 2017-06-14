import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from "@angular/core";
import { TRANSLATE_EN } from "./locale/messages.en";
import {  TRANSLATE_FR } from "./locale/messages.fr";

export function getTranslationProviders(): Promise<Object[]> {

  // Get the locale id from the global
  const locale: string = document["locale"] as string;

  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];

  // English providers
  if (locale === "en" ) {

    return Promise.resolve([
      {provide: TRANSLATIONS, useValue: TRANSLATE_EN},
      {provide: TRANSLATIONS_FORMAT, useValue: "xlf"},
      {provide: LOCALE_ID, useValue: locale}]);

  }

  // French providers
  if (locale === "fr" ) {

    return Promise.resolve([
      {provide: TRANSLATIONS, useValue: TRANSLATE_FR},
      {provide: TRANSLATIONS_FORMAT, useValue: "xlf"},
      {provide: LOCALE_ID, useValue: locale}]);

  }

  // Else no providers
  return Promise.resolve(noProviders);

}
