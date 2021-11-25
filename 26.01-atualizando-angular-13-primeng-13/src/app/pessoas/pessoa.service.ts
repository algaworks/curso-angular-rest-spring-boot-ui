import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cidade, Estado, Pessoa } from '../core/model';
import { firstValueFrom } from 'rxjs';

export class PessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoaFiltro) : Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }   

    return firstValueFrom(
        this.http.get(`${this.pessoasUrl}`, { headers, params })
      )
      .then((response : any) => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  listarTodas() : Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return firstValueFrom(
        this.http.get(this.pessoasUrl, { headers })
      )
      .then((response: any) => response['content']);
  }

  excluir(codigo: number) : Promise<void> {    
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return firstValueFrom(this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers }));
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }));
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers }));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers }));
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return firstValueFrom(this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers }));
  }

  listarEstados(): Promise<Estado[]> {
    return firstValueFrom(
      this.http.get<Estado[]>(this.estadosUrl)
    );
  }

  pesquisarCidades(estadoId: number): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estadoId);

    return firstValueFrom(
      this.http.get<Cidade[]>(this.cidadesUrl, { params })
    );
  }

}
