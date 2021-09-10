import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  profissoes = ['Programador', 'Empresário', 'Outra'];
  profissao = 'Outra';

  salvar(form: NgForm) {    
    console.log(this.profissao);

    console.log(form.value.profissao);
  }

}
