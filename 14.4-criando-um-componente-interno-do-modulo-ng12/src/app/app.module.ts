import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NavegacaoModule } from './navegacao/navegacao.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavegacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
