import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LancamentoService } from '../lancamentos/lancamento.service';

@Injectable({
  providedIn: 'root'
})
export class StepClassificacaoGuard implements CanActivate {

  constructor(private lancamentoService: LancamentoService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return Boolean(this.lancamentoService.getLancamentoInfoPrincipal())

  }
}