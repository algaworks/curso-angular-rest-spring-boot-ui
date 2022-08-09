import { Component } from '@angular/core';
import { Funcionario } from './funcionario-form/funcionario-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  funcionarios: Funcionario[] = [];

  aoAdicionar(funcionario: Funcionario) {
    console.log(funcionario);
    
    this.funcionarios.push(funcionario)
  }
}
