import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any ;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService  
  ) { 
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(this.oauthTokenUrl, body, { headers });
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);
    
    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
