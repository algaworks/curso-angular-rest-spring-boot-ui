import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from '../relatorio.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio?: Date;
  periodoFim?: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio!, this.periodoFim!)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}