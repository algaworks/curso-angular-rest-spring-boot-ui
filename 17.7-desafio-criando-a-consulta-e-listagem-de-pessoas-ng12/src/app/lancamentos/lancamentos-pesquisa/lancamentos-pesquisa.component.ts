import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { ApiResponse, Lancamento, LancamentoFiltro } from './../../core/interfaces';
@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro: LancamentoFiltro = {
    pagina: 0,
    itensPorPagina: 5
  }

  totalRegistros: number = 0

  lancamentos: Lancamento[] = [] ;
  
  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
  }
  
  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.lancamentoService.pesquisar(this.filtro)
      .subscribe((dados: ApiResponse<Lancamento>) => {
        this.lancamentos = dados.content
        this.totalRegistros = dados.totalElements 
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

}
