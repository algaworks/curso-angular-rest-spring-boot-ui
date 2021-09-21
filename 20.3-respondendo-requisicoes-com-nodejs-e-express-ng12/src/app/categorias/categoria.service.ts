import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Categoria } from '../core/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string

  constructor(private http: HttpClient) { 
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }
}
