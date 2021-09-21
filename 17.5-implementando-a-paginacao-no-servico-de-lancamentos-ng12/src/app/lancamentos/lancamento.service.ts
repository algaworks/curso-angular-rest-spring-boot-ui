import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe} from '@angular/common';

import { ApiResponse, Lancamento, LancamentoFiltro } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Observable<ApiResponse<Lancamento>> {
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

    console.log(params);
    

    return this.http.get<ApiResponse<Lancamento>>(`${this.lancamentosUrl}?resumo`, { headers, params });
  }

}
