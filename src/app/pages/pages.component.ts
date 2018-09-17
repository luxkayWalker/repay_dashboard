import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  constructor(public authService: AuthService) {}
  menu = MENU_ITEMS;
}
