import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from 'src/app/shared/shared.module';
import { EtapaClassificacaoComponent } from './etapa-classificacao/etapa-classificacao.component';
import { EtapaObservacaoComponent } from './etapa-observacao/etapa-observacao.component';
import { EtapaPrincipalComponent } from './etapa-principal/etapa-principal.component';
import { EtapasRoutingModule } from './etapas-routing.module';

@NgModule({
  declarations: [
    EtapaPrincipalComponent,
    EtapaClassificacaoComponent,
    EtapaObservacaoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    InputNumberModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    SharedModule,

    EtapasRoutingModule
  ]
})
export class EtapasModule { }
