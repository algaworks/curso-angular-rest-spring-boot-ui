import { environment } from './../../environments/environment';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string
  dataVencimentoInicio?: Date
  dataVencimentoFim?: Date
  pagina: number = 0
  itensPorPagina: number = 5
}

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

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
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

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then((response: any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then((response: any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}