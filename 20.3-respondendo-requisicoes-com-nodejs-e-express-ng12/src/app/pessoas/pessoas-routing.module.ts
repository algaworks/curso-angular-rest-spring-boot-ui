import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
    { path: 'pessoas', component: PessoasPesquisaComponent },
    { path: 'pessoas/novo', component: PessoaCadastroComponent },
    { path: 'pessoas/:codigo', component: PessoaCadastroComponent }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PessoasRoutingModule { }