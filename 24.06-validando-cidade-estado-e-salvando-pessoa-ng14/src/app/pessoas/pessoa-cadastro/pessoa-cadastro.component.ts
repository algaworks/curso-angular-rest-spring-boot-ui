import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[] = [];
  cidades: any[] = [];
  estadoSelecionado?: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    if (codigoPessoa && codigoPessoa !== 'nova') {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }
  
  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.codigo : undefined;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }
        this.atualizarTituloEdicao();
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado!)
      .then(cidades => {
        this.cidades = cidades.map(c => ({
          label: c.nome,
          value: c.codigo
        }));
        if (this.estadoSelecionado !== this.pessoa.endereco.cidade.estado.codigo)
          this.pessoa.endereco.cidade.codigo = undefined;
      })
      .catch((erro: any) => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then((pessoaAdicionada: Pessoa) => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

        this.router.navigate(['pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: NgForm) {
    form.reset();

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['pessoas', 'nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
