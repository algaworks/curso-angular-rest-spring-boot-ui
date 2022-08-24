import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

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
    DatePipe,
  ]
})
export class CoreModule { }
