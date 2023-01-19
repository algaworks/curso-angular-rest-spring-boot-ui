import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../../lancamento.service';

@Component({
  selector: 'app-etapa-classificacao',
  templateUrl: './etapa-classificacao.component.html',
  styleUrls: ['./etapa-classificacao.component.css']
})
export class EtapaClassificacaoComponent implements OnInit {

  activeIndex: number = 1

  formulario!: FormGroup;

  categorias: any[] = [];
  pessoas: any[] = []

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario()
    this.carregarCategorias()
    this.carregarPessoas()

    const classificacao = this.lancamentoService.getLancamentoClassificacao();

    if (classificacao)
      this.formulario.patchValue(classificacao)    
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      })
    });
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map((p: any) => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }  

  salvar() {
    this.lancamentoService.setStepClassificacao(this.formulario.value)
    this.router.navigate(['lancamentos/etapa-container/etapa-observacao'])
  }

  voltar() {
    this.router.navigate(['lancamentos/etapa-container/etapa-principal'])
  }
}
