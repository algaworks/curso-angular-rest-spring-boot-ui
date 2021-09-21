import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { IApiResponse, ILancamento, ILancamentoFiltro } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  pesquisar(filtro: ILancamentoFiltro): Observable<IApiResponse<ILancamento>> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);
    

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }   
    
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get<IApiResponse<ILancamento>>(`${this.lancamentosUrl}?resumo`, { headers, params });
  }

  excluir(codigo: number): Observable<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

  adicionar(lancamento: ILancamento): Observable<ILancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.post<ILancamento>(this.lancamentosUrl, lancamento, { headers });
  }

  atualizar(lancamento: ILancamento): Observable<ILancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.put<ILancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<ILancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<ILancamento>(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

}
