import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
