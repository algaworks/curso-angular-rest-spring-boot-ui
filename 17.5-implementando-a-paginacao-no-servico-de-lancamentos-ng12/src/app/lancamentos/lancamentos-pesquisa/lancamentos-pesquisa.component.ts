import { Component, OnInit } from '@angular/core';

import { ApiResponse, Lancamento, LancamentoFiltro } from './../../core/interfaces';
import { LancamentoService } from './../lancamento.service';

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
  
  ngOnInit(): void {
    this.pesquisar();        
  }
  
  pesquisar(): void {        
    console.log(this.filtro);
    
    this.lancamentoService.pesquisar(this.filtro)
      .subscribe((dados: ApiResponse<Lancamento>) => {
        this.lancamentos = dados.content
        this.totalRegistros = dados.totalElements 
      });
  }



}
