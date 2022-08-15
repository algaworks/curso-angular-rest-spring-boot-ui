import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BotoesModule } from './../botoes/botoes.module';

import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    BotoesModule
  ],
  exports: [
    MenuComponent,

    BotoesModule
  ]
})
export class NavegacaoModule { }
