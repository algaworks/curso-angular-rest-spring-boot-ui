import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [  
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
