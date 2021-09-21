import { Component, Input, OnInit } from '@angular/core';

import { ILancamento } from '../../core/interfaces';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Input() lancamentos: ILancamento[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
