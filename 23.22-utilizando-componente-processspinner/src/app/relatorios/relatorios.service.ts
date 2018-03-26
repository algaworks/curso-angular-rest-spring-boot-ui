import { Injectable } from '@angular/core';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new URLSearchParams();

    params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params.set('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

}
