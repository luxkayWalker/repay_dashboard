import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private api: ApiService) { }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  loggin(credentials: Credentials) {
    return this.api.login(credentials).then((result) => this.onLogged(result));
  }

  onLogged(result: any) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result);
  }
}

export interface Credentials {
  email: string;
  senha: string;
}
