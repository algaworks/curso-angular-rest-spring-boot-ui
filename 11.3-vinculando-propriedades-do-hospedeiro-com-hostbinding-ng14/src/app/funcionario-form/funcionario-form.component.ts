import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent {

  ultimoId = 0;
  nome = 'Thiago';
  adicionado = false;
  @Output() funcionarioAdicionado = new EventEmitter()

  adicionar() {
    console.log(`Adicionando ${this.nome}`);
    this.adicionado = true;

    const funcionario: Funcionario = {
      id: ++this.ultimoId,
      nome: this.nome
    };

    this.funcionarioAdicionado.emit(funcionario);
  }

}

export interface Funcionario {
  id: number
  nome: string
}