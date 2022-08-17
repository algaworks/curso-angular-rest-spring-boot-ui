import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { CampoColoridoDirective } from './campo-colorido.directive';

import { LogService } from './log.service';
import { FuncionarioService } from './funcionario.service';

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioCardComponent,
    FuncionarioFormComponent,
    CampoColoridoDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    FuncionarioService,
    LogService,
    { provide: 'LogPrefixo', useValue: 'LOG2' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
