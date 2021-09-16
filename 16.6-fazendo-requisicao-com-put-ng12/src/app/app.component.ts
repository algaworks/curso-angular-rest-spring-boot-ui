import { CidadeService } from './cidade.service';
import { Component, OnInit } from '@angular/core';

interface Cidade {
  id: number,
  nome: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService) {}
  
  ngOnInit(): void {
    this.consultar();
  }
  
  consultar() {
    this.cidadeService.consultar()
      .then(dados => {
        this.cidades = dados;
      })
  }

  adicionar(nome: string) {
    this.cidadeService.adicionar({ nome })
      .then(cidade => {
        alert(`Cidade "${cidade.nome}" adicionada com código ${cidade.id}!`);
        this.consultar();
      })
  }

  excluir(id: number) {
    this.cidadeService.excluir(id)
    .then(() => {
      alert('Cidade excluída com sucesso!');
      this.consultar();
    });
  }

  atualizar(cidade: any) {
    this.cidadeService.atualizar(cidade)
      .then(() => {
        alert('Cidade alterada com sucesso!');
      });
  }
  
}
