import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IPessoa, IPessoaFiltro } from 'src/app/core/interfaces';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent{
  totalRegistros = 0;
  filtro: IPessoaFiltro = {
    pagina: 0,
    itensPorPagina: 5
  };
  pessoas: IPessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
      .subscribe(dados => {
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
