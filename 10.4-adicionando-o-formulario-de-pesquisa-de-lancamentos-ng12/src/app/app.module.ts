import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    ButtonModule,
    InputTextModule,
    TabViewModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
