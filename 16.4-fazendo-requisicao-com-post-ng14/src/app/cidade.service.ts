import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  consultar(): Promise<any> {
    return this.http.get('http://localhost:3000/cidades')
              .toPromise()
              .then(response => response);
  }

  adicionar(cidade: any): Promise<any> {    
    return this.http.post('http://localhost:3000/cidades', cidade)
              .toPromise()
              .then(response => response);
  }

}
