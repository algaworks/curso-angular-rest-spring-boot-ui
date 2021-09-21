import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, PessoaFiltro } from '../core/interfaces';
import { Pessoa } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient)  { }

  pesquisar(filtro: PessoaFiltro) : Observable<ApiResponse<Pessoa>> {
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }   

    return this.http.get<ApiResponse<Pessoa>>(`${this.pessoasUrl}`, { params });
  }

  listarTodas() : Observable<ApiResponse<Pessoa>> {

    return this.http.get<ApiResponse<Pessoa>>(`${this.pessoasUrl}`);
  }

  excluir(codigo: number) : Observable<void> {    

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers });
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers });
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`);
  }
}
