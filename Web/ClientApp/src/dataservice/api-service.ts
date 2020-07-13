import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-dependency-injection';
import * as qs from 'querystringify';
import { JwtService } from './jwt-service';
import { status, parseError } from './service-helper';

@inject(HttpClient, JwtService)
export class ApiService {
  http: any;
  jwtService: any;

  constructor(http, jwtService) {
    this.http = http;
    this.jwtService = jwtService;
  }

  setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new Headers(headersConfig);
  }

  get(path, params) {
    const options = {
      method: 'GET',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${path}?${qs.stringify(params)}`, options)
      .then(status)
      .catch(parseError)
  }

  put(path, body = {}) {
    const options = {
      method: 'PUT',
      headers: this.setHeaders(),
      body: json(body)
    };
    return this.http.fetch(path, options)
      .then(status)
      .catch(parseError)
  }

  post(path, body = {}) {
    const options = {
      method: 'POST',
      headers: this.setHeaders(),
      body: json(body)
    };
    return this.http.fetch(path, options)
      .then(status)
      .catch(parseError)
  }

  delete(path, params) {
    
    const options = {
      method: 'DELETE',
      headers: this.setHeaders()
    };
    return this.http.fetch(`${path}?${qs.stringify(params)}`, options)
      .then(status)
      .catch(parseError)
  }
}
