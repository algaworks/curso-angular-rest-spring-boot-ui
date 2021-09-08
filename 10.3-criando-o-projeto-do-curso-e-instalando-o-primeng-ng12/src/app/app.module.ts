import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
