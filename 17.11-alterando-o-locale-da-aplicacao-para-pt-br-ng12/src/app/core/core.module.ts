import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


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
  ]
})
export class CoreModule { }
