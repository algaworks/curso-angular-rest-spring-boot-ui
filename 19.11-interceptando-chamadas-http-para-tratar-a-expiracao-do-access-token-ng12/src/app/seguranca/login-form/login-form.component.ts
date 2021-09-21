import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { throwError } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {

    this.auth.login(usuario, senha)
      .subscribe(
        () => {
          this.router.navigate(['lancamentos'])
        },
        (response) => {          
          this.errorHandler.handle(response);
        }
      )
  }
}
