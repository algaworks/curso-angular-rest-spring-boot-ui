import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { ILancamento, ILancamentoFiltro } from './../../core/interfaces';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro: ILancamentoFiltro = {
    pagina: 0,
    itensPorPagina: 5
  }
  totalRegistros: number = 0
  lancamentos: ILancamento[] = [] ;
  @ViewChild('tabela') grid: any;
  
  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }
  
  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.lancamentoService.pesquisar(this.filtro)
      .subscribe(
        (dados) => {
          this.lancamentos = dados.content
          this.totalRegistros = dados.totalElements  
        },
        (erro) => this.errorHandler.handle(erro)          
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: ILancamento): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: ILancamento) {

    this.lancamentoService.excluir(lancamento.codigo)
      .subscribe(
        () => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.reset();
          }

          this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
        },
        (error) => this.errorHandler.handle(error) 
      )
      
  }

}
