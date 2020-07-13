import { bindable, inject } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../shared/bootstrap-form-renderer';
import { I18N } from 'aurelia-i18n'; // <--------- 1
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApplicantService } from '../dataservice/applicantService';
import { Applicant } from '../Interface/interface';
import { Router } from 'aurelia-router';
import { areEqual } from '../utility';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from "../prompt/prompt";
import { strict } from 'assert';

@inject(ValidationControllerFactory, I18N, ApplicantService, Applicant, Router, DialogService)
export class ApplicantForm {
  i18n: I18N;
  @bindable
  applicant: Applicant
  originalApplicant: Applicant

  routeConfig;
  controller: ValidationController = null;
  static inject = [I18N, Element, EventAggregator];

  element: any;
  currentLocale: any;

  constructor(private controllerFactory: ValidationControllerFactory, private _i18n: I18N
    , private applicantService: ApplicantService
    , private _applicant: Applicant
    , private router: Router
    , private dialogService: DialogService) {
    this.applicant = _applicant;
    this.setup();
  }



  async activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    if (params.id) {
      this.applicantService.get(params.id).then(data => {
        this.applicant.id = data.id;
        this.applicant.address = data.address;
        this.applicant.name = data.name;
        this.applicant.countryOfOrigin = data.countryOfOrigin;
        this.applicant.age = data.age;
        this.applicant.hired = data.hired;
        this.applicant.emailAdress = data.emailAdress;
        this.applicant.familyName = data.familyName;
        this.originalApplicant = this.deepClone(this.applicant);
      });
    }

  }

  setup() {
    this.originalApplicant = this.deepClone(this.applicant);
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.i18n = this._i18n;
  }


  get canSave() {
    return !(this.controller.errors.length > 0);
  }

  get hasChanged() {
    return !areEqual(this.applicant, this.originalApplicant);
  }

  reset() {
    if (!areEqual(this.applicant, this.originalApplicant)) {
      this.dialogService.open({ viewModel: Prompt, model: 'Are you sure? you want to reset the form values?' }).whenClosed().then(response => {
        if (!response.wasCancelled) {
          this.applicant = this.deepClone(this.originalApplicant);
        }
      });
    }
    else {
      this.dialogService.open({ viewModel: Prompt, model: 'No changes detected.' });
    }
  }

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  save() {
    this.controller.validate().then(a => {
      if (a.valid) {
        if (!areEqual(this.applicant, this.originalApplicant)) {
          if (this.applicant.id > 0) {
            this.applicantService.update(this.applicant).then(data => {
              console.log(data);
              this.router.navigateToRoute('home');
            });
          }
          else {
            this.applicantService.add(this.applicant).then(data => {
              console.log(data);
              this.router.navigateToRoute('home');
            });
          }
        }
      }
      else {
        let message = "";
        for (let i = 0; i < this.controller.errors.length; i++) {
          message += this.controller.errors[i].message+",";
        }
        this.dialogService.open({ viewModel: Prompt, model: message });
      }
    });
  }

}

