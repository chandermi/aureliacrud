import { I18N } from "aurelia-i18n";
import {  autoinject } from "aurelia-dependency-injection";

@autoinject
export class Locale {
  static inject = [I18N];
  i18n: any;
  locales: { title: string; code: string; }[];
  currentLocale: any;
  localeobj: string;
  constructor(i18n) {
    this.i18n = i18n;
    this.locales = [
      {
        title: "English",
        code: "en"
      },
      {
        title: "Deutsche",
        code: "de"
      }
    ]
    this.currentLocale = this.i18n.getLocale();
  }

  setLocale() {

    let code = this.localeobj
    if (this.currentLocale !== code) {
      this.i18n.setLocale(code);
      this.currentLocale = code;
    }

  }
}
