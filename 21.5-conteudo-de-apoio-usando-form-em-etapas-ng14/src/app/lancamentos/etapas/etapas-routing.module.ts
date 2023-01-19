import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../seguranca/auth.guard';
import { StepClassificacaoGuard } from '../../seguranca/step-classificacao.guard';
import { StepObservacaoGuard } from '../../seguranca/step-observacao.guard';
import { EtapaClassificacaoComponent } from './etapa-classificacao/etapa-classificacao.component';
import { EtapaContainerComponent } from "./etapa-container/etapa-container.component";
import { EtapaObservacaoComponent } from './etapa-observacao/etapa-observacao.component';
import { EtapaPrincipalComponent } from './etapa-principal/etapa-principal.component';

const routes: Routes = [
  {
    path: 'etapa-container',
    component: EtapaContainerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] },
    children: [
      { path: '', redirectTo: 'etapa-principal', pathMatch: 'full' },
      {
        path: 'etapa-principal',
        component: EtapaPrincipalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      },
      {
        path: 'etapa-principal/:codigo',
        component: EtapaPrincipalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      },
      {
        path: 'etapa-classificacao',
        component: EtapaClassificacaoComponent,
        canActivate: [AuthGuard, StepClassificacaoGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      },
      {
        path: 'etapa-observacao',
        component: EtapaObservacaoComponent,
        canActivate: [AuthGuard, StepObservacaoGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      }
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EtapasRoutingModule { }