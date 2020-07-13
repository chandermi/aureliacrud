import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { ApplicantService } from "../dataservice/applicantService";
import { DialogService } from 'aurelia-dialog';
import { Prompt } from "../prompt/prompt";


@inject(ApplicantService, HttpClient, DialogService)
export class Applicantdata {
  constructor(private applicantService: ApplicantService, private http: HttpClient, private dialogService: DialogService) { }
  applicants: IApplicant[]

  async activate() {

    await this.applicantService.getList().then(data => {
      this.applicants = data
    });
  }

  delete(id) {
    this.dialogService.open({ viewModel: Prompt, model: 'Are you sure? you want to delete this item ?' }).whenClosed().then(response => {
      if (!response.wasCancelled) {
        this.applicantService.destroy(id).then(data => {
          let index = this.applicants.indexOf(this.applicants.find(x => x.id == id));
          this.applicants.splice(index, 1);
        });
      } else {
        console.log('cancelled');
      }
    });
  }
}
interface IApplicant {
  id: number;
  name: string;
  familyName: string;
  address: string;
  countryOfOrigin: string;
  emailAdress: string;
  age: number;
  hired: boolean;
}

