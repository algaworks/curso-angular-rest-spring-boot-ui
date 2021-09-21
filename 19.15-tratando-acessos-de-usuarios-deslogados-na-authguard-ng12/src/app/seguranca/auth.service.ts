import { NotAuthenticatedError } from './money-http-interceptor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any ;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router  
  ) { 
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
    .toPromise()
    .then((response: any) => {
      this.armazenarToken(response.access_token);
    })
    .catch(response => {
      if (response.status === 400) {
        if (response.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }
      return Promise.reject(response);
    });
  }

  obterNovoAccessToken(): Promise<void> {
    
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<void>(this.oauthTokenUrl, body, { headers, withCredentials: true})
      .toPromise()
      .then(
        (response: any) => {
          this.armazenarToken(response['access_token']);

          console.log('Novo access token criado!');

          return Promise.resolve();
        }
      )
      .catch(
        (response: any) => {
          console.error('Erro ao renovar token.', response);
          return Promise.resolve();
        }
      )

  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');  
    return !token || this.jwtHelper.isTokenExpired(token);
  }
  
  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
  
  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);    
    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}