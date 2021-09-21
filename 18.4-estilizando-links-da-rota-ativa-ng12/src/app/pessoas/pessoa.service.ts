import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApiResponse, IPessoa, IPessoaFiltro } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient)  { }

  pesquisar(filtro: IPessoaFiltro) : Observable<IApiResponse<IPessoa>> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }   

    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoasUrl}`, { headers, params });
  }

  listarTodas() : Observable<IApiResponse<IPessoa>> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<IApiResponse<IPessoa>>(`${this.pessoasUrl}`, { headers });
  }

  excluir(codigo: number) : Observable<void> {    
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers });
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers });
  }

  adicionar(pessoa: IPessoa): Observable<IPessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.post<IPessoa>(this.pessoasUrl, pessoa, { headers });
  }
}
