import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessageComponent } from './shared/message/message.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    LancamentosModule,
    PessoasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
