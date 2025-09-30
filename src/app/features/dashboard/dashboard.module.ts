import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { CryptoTableComponent } from './dashboard/components/crypto-table/crypto-table.component';
import { PriceChartComponent } from './dashboard/components/crypto-table/price-chart/price-chart.component';
import { SearchCryptoComponent } from './dashboard/components/search-crypto/search-crypto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CryptoTableComponent,
    PriceChartComponent,
    SearchCryptoComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
