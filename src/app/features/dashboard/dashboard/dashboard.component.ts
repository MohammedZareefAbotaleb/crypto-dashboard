import { Component } from '@angular/core';
import { DashboardModule } from '../dashboard.module';
import { CoinMarket } from '../../../core/interfaces/coin-interface';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { TopcryptoService } from '../../../core/services/topcrypto.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cryptos: CoinMarket[] = [];
  headers: string[] = ['#', 'Name', 'Price', 'Market Cap', '24h %', 'last 7d'];

  private pollSub?: Subscription;
  private searchQuery: string = ''; // store search query (name)

  constructor(private topcrypto: TopcryptoService) {}

  ngOnInit(): void {
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling() {
    this.stopPolling();
    this.pollSub = interval(30000).pipe(
      startWith(0),
      switchMap(() => this.loadData())
    ).subscribe(data => this.cryptos = data);
  }

  private stopPolling() {
    this.pollSub?.unsubscribe();
  }

  private loadData() {
    if (this.searchQuery.trim().length > 0) {
      // search with query (name or partial)
      return this.topcrypto.searchCoins(this.searchQuery);
    }
    // default top 10 coins
    return this.topcrypto.getTop10Coins();
  }

  // triggered by search component
  onSearch(query: string) {
    this.searchQuery = query;
    this.startPolling(); // restart polling with new query
  }

  // clear search and show top 10
  onClear() {
    this.searchQuery = '';
    this.startPolling();
  }
}
