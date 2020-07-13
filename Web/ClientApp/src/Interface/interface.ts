import { ValidationRules } from "aurelia-validation";

export class Applicant {
  id: number;
  name: string;
  familyName: string;
  address: string;
  countryOfOrigin: string;
  emailAdress: string;
  age: number;
  hired: boolean;
}

ValidationRules
  .ensure((appl: Applicant) => appl.name).required().minLength(5).maxLength(50)
  .ensure((appl: Applicant) => appl.familyName).required().minLength(5).maxLength(50)
  .ensure((appl: Applicant) => appl.address).required().minLength(10).maxLength(100)
  .ensure((appl: Applicant) => appl.countryOfOrigin).required()
  .ensure((appl: Applicant) => appl.emailAdress).required().email()
  .ensure((appl: Applicant) => appl.age).required().min(18).max(60)
  .ensure((appl: Applicant) => appl.hired).required()
  .on(Applicant);
