import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LancamentoService } from '../../lancamento.service';

@Component({
  selector: 'app-etapa-container',
  templateUrl: './etapa-container.component.html',
  styleUrls: ['./etapa-container.component.css']
})
export class EtapaContainerComponent implements OnDestroy {

  items: MenuItem[] = [];

  constructor(private lancamentoService: LancamentoService) {
    this.items = [{
      label: 'Principal',
      routerLink: 'etapa-principal'
    },
    {
      label: 'Classificação',
      routerLink: 'etapa-classificacao'
    },
    {
      label: 'Observações',
      routerLink: 'etapa-observacao'
    }];
  }

  ngOnDestroy(): void {
    this.lancamentoService.apagarSteps();
  }
}
