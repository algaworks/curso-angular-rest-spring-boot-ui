import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha);
  }
}