import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, LancamentoFiltro } from '../core/interfaces';
import { Lancamento } from '../core/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
  }

  pesquisar(filtro: LancamentoFiltro): Observable<ApiResponse<Lancamento>> {
      
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

    return this.http.get<ApiResponse<Lancamento>>(`${this.lancamentosUrl}?resumo`, { params });
  }

  excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers });
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
  
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`);
  }

}
