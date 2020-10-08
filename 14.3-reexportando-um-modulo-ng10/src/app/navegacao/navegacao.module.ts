import { BotoesModule } from './../botoes/botoes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    BotoesModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent, BotoesModule]
})
export class NavegacaoModule { }
