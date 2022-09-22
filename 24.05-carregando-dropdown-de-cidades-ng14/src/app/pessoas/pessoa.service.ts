import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../core/model';
import { environment } from './../../environments/environment';
import { Cidade, Estado } from './../core/model';

export class PessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl: string
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`).toPromise();
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa).toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`).toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estadoId: number): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estadoId);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params }).toPromise();
  }
}
