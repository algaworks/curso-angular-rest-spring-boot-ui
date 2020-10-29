import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor() { }

  ngOnInit() {
  }

  gerar() {
    console.log(this.periodoInicio);
    console.log(this.periodoFim);
  }
}
