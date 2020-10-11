import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-funcionario-card',
  templateUrl: './funcionario-card.component.html',
  styles: [`
    .card-block {
      text-transform: uppercase;
    }
  `]
})
export class FuncionarioCardComponent {

  @Input() funcionario: any;

}
