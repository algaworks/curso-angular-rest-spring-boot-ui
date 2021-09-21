import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa()

  constructor(
    private pessoaService: PessoaService,   
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  salvar(pessoasForm: NgForm) {
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

}
