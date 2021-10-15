import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService, PessoaFiltro } from '../pessoa.service'

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro()
  pessoas: any[] = [];
  @ViewChild('tabela') grid!: any;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    
    this.pessoaService.pesquisar(this.filtro)
      .then((dados: any) => {
        this.pessoas = dados.pessoas;
        this.totalRegistros = dados.total; 
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;
      this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then(
        () => {
          this.grid.reset();

          this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
        }
      )
      .catch((error) => this.errorHandler.handle(error))
      
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
