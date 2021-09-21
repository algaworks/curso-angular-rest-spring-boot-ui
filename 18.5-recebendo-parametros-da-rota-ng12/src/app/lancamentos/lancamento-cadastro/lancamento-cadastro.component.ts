import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { IPessoa, ILancamento } from './../../core/interfaces';

import { MessageService } from 'primeng/api';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  
  lancamento: ILancamento = new Lancamento();

  categorias: any[] = [];
  pessoas: any[] = []

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,    
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias()
    this.carregarPessoas()
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe(
      dados => {
        this.categorias = dados.map(dado => ({label: dado.nome, value: dado.codigo}))                  
      },
      erro => this.errorHandler.handle(erro)
    )
  }

  carregarPessoas() {
    this.pessoaService.listarTodas().subscribe(
      dados => {        
        this.pessoas = dados.content.map((dado: IPessoa) => ({label: dado.nome, value: dado.codigo}))     
      },      
      erro => this.errorHandler.handle(erro)
    )
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(
        () => {
          this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

          lancamentoForm.reset();
          this.lancamento = new Lancamento();
        },
        erro => this.errorHandler.handle(erro)
      );  
  
  }

}
