import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiResponse, Pessoa, PessoaFiltro } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient)  { }

  pesquisar(filtro: PessoaFiltro) : Observable<ApiResponse<Pessoa>> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }   

    return this.http.get<ApiResponse<Pessoa>>(`${this.pessoasUrl}`, { headers, params });
  }

  listarTodas() : Observable<ApiResponse<Pessoa>> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<ApiResponse<Pessoa>>(`${this.pessoasUrl}`, { headers });
  }

}
