import { Component } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ApiResponse, Pessoa, PessoaFiltro } from '../../core/interfaces';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent{
  totalRegistros = 0;
  filtro: PessoaFiltro = {
    pagina: 0,
    itensPorPagina: 5
  };
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
      .subscribe((dados: ApiResponse<Pessoa>) => {
        this.pessoas = dados.content
        this.totalRegistros = dados.totalElements 
        console.log(this.pessoas);
        
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }
}
