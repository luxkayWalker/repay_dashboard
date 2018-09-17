import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private api: ApiService) { }

  isLoggedIn() {
    return false;
  }

  loggin(credentials: Credentials) {
    this.api.login(credentials).then((result) => {
      debugger
    }).catch((error) => {

    });
  }
}

export interface Credentials {
  email: string;
  senha: string;
}
