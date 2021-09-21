import { Component, OnInit } from '@angular/core';

import { Lancamento, LancamentoFiltro } from '../../core/interfaces';
import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao?: string;
  dataVencimentoInicio?: Date ;
  dataVencimentoFim?: Date;
  lancamentos: Lancamento[] = [] ;
  
  constructor(private lancamentoService: LancamentoService) {}
  
  ngOnInit(): void {
    this.pesquisar();        
  }
  
  pesquisar(): void {    
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,      
      dataVencimentoInicio: this.dataVencimentoInicio ,
      dataVencimentoFim: this.dataVencimentoFim
    }   
    
    this.lancamentoService.pesquisar(filtro)
      .subscribe(dados => this.lancamentos = dados.content);
  }



}
