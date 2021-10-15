import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


const routes: Routes = [
    { 
      path: '', 
      component: LancamentosPesquisaComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] } 
    },
    { 
      path: 'novo', 
      component: LancamentoCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } 
    },
    {
      path: ':codigo', 
      component: LancamentoCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } 
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class LancamentosRoutingModule { }