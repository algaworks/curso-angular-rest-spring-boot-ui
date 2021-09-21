import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    MessageService,

    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
