import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component';
import {ThemeModule} from './../../@theme/theme.module';
import {MiscellaneousModule} from '../miscellaneous/miscellaneous.module';
import {ToasterModule} from 'angular2-toaster';


@NgModule({
  imports: [
    ThemeModule,
    MiscellaneousModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
  ],
})

export class LoginComponentModule { }
