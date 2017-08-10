import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cidades = [
    { id: 1, nome: 'Uberlândia' },
    { id: 2, nome: 'São Paulo' },
    { id: 3, nome: 'Florianópolis' },
    { id: 4, nome: 'Curitiba' }
  ];

  adicionar(nome: string) {
    alert(nome);
  }

  excluir(id: number) {
    alert(id);
  }

  atualizar(cidade: any) {
    alert(JSON.stringify(cidade));
  }

}
