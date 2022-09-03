import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    { path: 'lancamentos', component: LancamentosPesquisaComponent },
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class LancamentosRoutingModule { }