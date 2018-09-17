import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://ec2-52-37-75-209.us-west-2.compute.amazonaws.com:8082/api';
  // url: string = 'http://localhost:8082/api';

  constructor(public http: HttpClient) {
  }

  login(body: any) {
    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Basic ' + btoa(body.email + ':' + body.senha)
      };

      this.http.post(this.url + '/auth/authenticate', null, {observe: 'response', headers: headers})
        .subscribe((result) => {
          const body: any = result.body;
          const token =  result.headers.get('token') ? result.headers.get('token') : body.token;
        if(token) {
          this.setTokenAPI(token);
          resolve(body);
        }else{
          reject('Erro ao realizar login.');
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  get(endpoint: string, params?: any, reqOpts: any = {}) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts.headers = this.getHeaders();

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = {};
    reqOpts.headers = this.getHeaders();
    reqOpts.responseType = 'json';
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts.headers = this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts.headers = this.getHeaders();
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts.headers = this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  resolveURL(endpoint, params?) {
    let url = this.url
    for (const key in params) {
      if(typeof params[key] === 'string' || typeof params[key] === 'number') {
        url = url.replace('{' + key + '}', params[key]);
      }
    }
    return url;
  }

  setTokenAPI(token) {
    localStorage.setItem('_USER_TOKEN', token);
  }

  getTokenAPI() {
    return localStorage.getItem('_USER_TOKEN');
  }

  getHeaders() {
    let headers: any = {}
    let authorization = this.getTokenAPI();
    if(authorization){
      headers.Authorization = authorization;
    }
    headers['Content-Type'] = 'application/json';
    return headers;
  }

  refreshTokenAPI(){
    return new Promise(() => {
      const token = this.getTokenAPI();
      this.http.post('refresh-token', token, {observe: 'response'}).subscribe((result) => {
        const token =  result.headers.get('token');
        if (token) {
          this.setTokenAPI(token);
        }
      });
    });
  }
}
