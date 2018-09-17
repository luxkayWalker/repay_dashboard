import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: string;
  public senha: string;

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/login']);
    }else {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  onSubmit() {
    debugger;
    this.authService.loggin({email: this.email, senha: this.senha})
  }

}
