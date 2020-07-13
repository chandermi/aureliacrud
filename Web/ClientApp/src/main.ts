import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import { I18N, TCustomAttribute, Backend } from 'aurelia-i18n';
import * as XHR from 'i18next-xhr-backend';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin('au-table')
    .plugin('aurelia-validation')
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .feature('resources');

  //aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => { // <------------ 3
  //  instance.i18next.use(XHR);

  //  // adapt options to your needs (see http://i18next.com/docs/options/)
  //  instance.setup({ 
  //    backend: {                                  // <-- configure backend settings
  //      loadPath: '/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
  //    },
  //    lng: 'en',
  //    attributes: ['t', 'i18n'],
  //    fallbackLng: 'cy',
  //    debug: false
  //  });
  //});
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => { // <------------ 3
    let aliases = ['t', 'i18n']; // <------------ 4
    TCustomAttribute.configureAliases(aliases);
    instance.i18next.use(Backend); // <------------ 5
    return instance.setup({
      fallbackLng: 'ru', // <------------ 6
      whitelist: ['en', 'ru'],
      preload: ['en', 'ru'], // <------------ 7
      ns: 'global', // <------------ 8
      defaultNS: 'global',
      fallbackNS: false,
      attributes: aliases, // <------------ 9
      lng: 'en', // <------------ 10
      debug: true, // <------------ 11
      backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json',  // <------------ 12
      }
    });
  });
  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));

  }
  aurelia.use.plugin(PLATFORM.moduleName('au-table'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'))
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
