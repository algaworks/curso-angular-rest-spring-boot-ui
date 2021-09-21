import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { IPessoa } from './../../core/interfaces';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: IPessoa = new Pessoa()

  constructor(
    private pessoaService: PessoaService,   
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {    
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .subscribe(
        (pessoa) => {
          this.pessoa = pessoa;          
          this.atualizarTituloEdicao();
        },
        erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(pessoasForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(
        () => {
          this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

          pessoasForm.reset();
          this.pessoa = new Pessoa();
        },
        erro => this.errorHandler.handle(erro)
      );    
  }

  atualizarPessoa(pessoasForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(
        pessoa => {
          this.pessoa = pessoa;

          this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
          this.atualizarTituloEdicao();
        },
        erro => this.errorHandler.handle(erro)
      );    
  }

  nova(form: NgForm) {
    form.reset(new Pessoa());
    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
