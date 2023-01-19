import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LancamentoService } from '../../lancamento.service';

@Component({
  selector: 'app-etapa-principal',
  templateUrl: './etapa-principal.component.html',
  styleUrls: ['./etapa-principal.component.css']
})
export class EtapaPrincipalComponent implements OnInit {

  activeIndex: number = 0

  formulario!: FormGroup;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario()

    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.lancamentoService.buscarPorCodigoSteps(codigoLancamento)
        .then((lancamento) => {
          this.preencherLancamento()
        })
    } else {
      this.preencherLancamento()
    }
  }

  preencherLancamento() {
    const infoPrincipal = this.lancamentoService.getLancamentoInfoPrincipal();
    if (infoPrincipal) {
      this.formulario.patchValue(infoPrincipal)
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
    });
  }

  salvar() {
    this.lancamentoService.setStepInfoPrincipal(this.formulario.value)
    this.router.navigate(['lancamentos/etapa-container/etapa-classificacao'])
  }
}
