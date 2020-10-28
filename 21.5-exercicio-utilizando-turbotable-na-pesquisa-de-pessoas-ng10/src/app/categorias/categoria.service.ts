import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }

}
