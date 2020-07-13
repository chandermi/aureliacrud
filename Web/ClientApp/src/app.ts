import { Router, RouterConfiguration } from 'aurelia-router';
import { inject, PLATFORM } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { I18N } from 'aurelia-i18n';
import { Locale } from './localeComponent/locale';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(I18N, Element, EventAggregator,WebAPI)
export class App {
  router: Router;
  public i18n: any;
  element: any;
  currentLocale: any;

  
  constructor(i18n, element, ea) {
    this.i18n = i18n;
    this.element = element;
    this.currentLocale = this.i18n.getLocale();
    ea.subscribe('i18n:locale:changed', payload => {
      this.i18n.updateTranslations(this.element);
    });

  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Home';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: ['', 'home'], moduleId: PLATFORM.moduleName('./applicant/applicant-list'), name: 'home' },
      { route: 'applicant/:id', moduleId: PLATFORM.moduleName('./applicant/applicant-form'), name: 'applicant' },
      { route: 'applicant', moduleId: PLATFORM.moduleName('./applicant/applicant-form'), name: 'applicantnew' }
    ]);

    this.router = router;
  }
  attached() { 
    this.i18n.updateTranslations(this.element);
  }
}

