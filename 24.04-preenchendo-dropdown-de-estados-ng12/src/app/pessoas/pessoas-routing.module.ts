import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
    { path: '', component: PessoasPesquisaComponent },
    { path: 'nova', component: PessoaCadastroComponent },
    { path: ':codigo', component: PessoaCadastroComponent }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PessoasRoutingModule { }