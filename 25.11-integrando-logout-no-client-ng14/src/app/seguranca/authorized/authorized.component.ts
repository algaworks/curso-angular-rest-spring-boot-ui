import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.auth.obterNovoAccessTokenComCode(params.code, params.state)
          .then(() => {
            this.route.navigate(['/'])
          })
          .catch((e: any) => {
            console.error('Erro no callback')
            this.route.navigate(['/'])
          });
      } else {
        this.route.navigate(['/']);
      }
    })
  }

}