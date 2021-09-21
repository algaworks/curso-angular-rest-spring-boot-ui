import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, ObservableInput, throwError } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {    
      
      this.auth.obterNovoAccessToken()
        .pipe(
          map(() => {  

            req = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });     

            return next.handle(req);
            })
          )
        .pipe(          
          catchError(
            () => throwError(new NotAuthenticatedError())
          )
        )
        .subscribe()
    }       

    return next.handle(req);
  }

}