import { IPessoa, ICategoria } from './../../core/interfaces';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  
  categorias: any[] = [];
  pessoas: any[] = []

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
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

}
