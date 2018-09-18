/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './pages/user/user.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CardsComponent } from './pages/cards/cards.component';
import {LoginComponentModule} from './pages/login/login.component.module';
import {AuthGuard} from './auth-guard.guard'

@NgModule({
  declarations: [AppComponent, UserComponent, TransactionsComponent, CardsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    LoginComponentModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
