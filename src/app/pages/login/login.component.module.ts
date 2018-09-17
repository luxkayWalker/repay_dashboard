import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component';
import {ThemeModule} from './../../@theme/theme.module';
import {MiscellaneousModule} from '../miscellaneous/miscellaneous.module';


@NgModule({
  imports: [
    ThemeModule,
    MiscellaneousModule,
  ],
  declarations: [
    LoginComponent,
  ],
})

export class LoginComponentModule { }
