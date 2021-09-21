import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { ApiResponse, LancamentoFiltro } from '../../core/interfaces';
import { Lancamento } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { LancamentoService } from '../lancamento.service';


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
        (dados: ApiResponse<Lancamento>) => {
          this.lancamentos = dados.content
          this.totalRegistros = dados.totalElements  
        },
        (erro: any) => this.errorHandler.handle(erro)          
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: Lancamento): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: Lancamento) {

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
        (error: any) => this.errorHandler.handle(error) 
      )
      
  }

}
