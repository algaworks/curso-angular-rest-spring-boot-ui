import { Component } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(public auth: AuthService) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .subscribe(
        (response: any) => {
          this.auth.armazenarToken(response.access_token)
          console.log(response);          
        },
        (response: any) => {
          console.log(response);          
        }
      );
  }
}
