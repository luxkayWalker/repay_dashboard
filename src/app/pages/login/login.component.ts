import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService, NotificationToast} from '../../services/notification.service';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public email: string;
  public senha: string;

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 4000;
  toastsLimit = 5;
  type = 'error';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = true;
  isCloseButton = true;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private toasterService: ToasterService,
              private router: Router) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/pages/login']);
    }else {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  onSubmit() {
    this.authService.loggin({email: this.email, senha: this.senha}).then((result) => {
      this.router.navigate(['/pages/dashboard']);
    }).catch((error) => {
      this.showToast(error.message);
    });
  }

  showToast(message) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: 'error',
      title: 'Atenção',
      body: message,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }


}
