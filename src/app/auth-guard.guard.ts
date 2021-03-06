import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private  authService: AuthService, private router: Router) {
  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if (this.authService.isLoggedIn()) return true;
    // else navigate to login

    this.router.navigate(['/pages/login']);
  }
}
