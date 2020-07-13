import { inject } from 'aurelia-dependency-injection';
import { ApiService } from './api-service';

@inject(ApiService)
export class ApplicantService {
  apiService: any;

  constructor(apiService) {
    this.apiService = apiService;
  }

  add(payload) {
    return this.apiService.post(`/api/applicant/add`, payload)
      .then(data => { console.log(data); })
  }

  get(slug) {
    return this.apiService.get(`/api/applicant/get/`, { id: slug })
      .then(data => data)
  }
  update(payload) {
    return this.apiService.put(`/api/applicant/update`, payload)
      .then(data => data)
  }
  getList() {
    return this.apiService.get(`/api/applicant/getall`)
      .then(data => data)
  }

  destroy(applicantId) {
    return this.apiService.delete(`/api/applicant/delete/`, { id: applicantId })
  }
}
