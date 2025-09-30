import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { CoinMarket } from '../../../../../core/interfaces/coin-interface';
import { SharedModule } from '../../../../../shared/shared/shared.module';

@Component({
  selector: 'app-crypto-table',
   standalone: true,
  imports: [CommonModule,PriceChartComponent,SharedModule],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.css'
})
export class CryptoTableComponent {
  @Input() cryptos: CoinMarket[] = [];
  @Input() headers: string[] = [];
  loading = true;
}