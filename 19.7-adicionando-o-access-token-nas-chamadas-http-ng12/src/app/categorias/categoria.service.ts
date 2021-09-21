import { ICategoria } from './../core/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<ICategoria[]> {

    return this.http.get<ICategoria[]>(this.categoriasUrl);
  }
}
