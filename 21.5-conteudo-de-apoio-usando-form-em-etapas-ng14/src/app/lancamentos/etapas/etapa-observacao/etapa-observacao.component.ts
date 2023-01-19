import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService } from '../../lancamento.service';

@Component({
  selector: 'app-etapa-observacao',
  templateUrl: './etapa-observacao.component.html',
  styleUrls: ['./etapa-observacao.component.css']
})
export class EtapaObservacaoComponent implements OnInit {

  activeIndex: number = 2

  formulario!: FormGroup;

  categorias: any[] = [];
  pessoas: any[] = []

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario()

    const observacao = this.lancamentoService.getLancamentoObservacao();

    if (observacao)
      this.formulario.patchValue(observacao)
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      observacao: []
    });
  }

  salvar() {
    this.lancamentoService.setStepObservacao(this.formulario.value)
    this.lancamentoService.adicionarStep()
      .then(lancamentoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        this.router.navigate(['/lancamentos/etapa-container/etapa-principal/', lancamentoAdicionado.codigo])
      }
      ).catch(erro => this.errorHandler.handle(erro));
  }

  voltar() {
    this.router.navigate(['lancamentos/etapa-container/etapa-classificacao'])
  }
}
