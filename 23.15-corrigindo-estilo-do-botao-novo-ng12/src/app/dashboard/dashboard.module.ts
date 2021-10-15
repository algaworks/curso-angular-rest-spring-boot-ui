import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,

    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent],
  providers: [ DecimalPipe ]
})
export class DashboardModule { }