import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
    { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
    { path: 'lancamentos', component: LancamentosPesquisaComponent },
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
    { path: 'pessoas', component: PessoasPesquisaComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
