import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { environment } from 'src/environments/environment';
import { AuthorizedComponent } from './authorized/authorized.component';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }       
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    }
  ],
  declarations: [
    AuthorizedComponent
  ]
})
export class SegurancaModule { }
