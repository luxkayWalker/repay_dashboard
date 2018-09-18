import { Injectable } from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 4000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = true;
  isCloseButton = true;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  constructor(private toasterService: ToasterService) { }

  warnning(notificaton: NotificationToast) {
    notificaton.type = 'warning';
    this.showToast(notificaton);
  }

  error(notificaton: NotificationToast) {
    notificaton.type = 'error';
    this.showToast(notificaton);
  }

  sucess(notificaton: NotificationToast) {
    notificaton.type = 'success';
    this.showToast(notificaton);
  }

  showToast(notificaton: NotificationToast) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: notificaton.duration ? notificaton.duration : this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: notificaton.type ? notificaton.type : 'default',
      title: notificaton.title,
      body: notificaton.body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}

export interface NotificationToast {
  body: string;
  type?: string;
  title?: string;
  duration?: number;
}
