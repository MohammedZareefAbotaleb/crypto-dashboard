import { Component } from '@angular/core';
import { DashboardModule } from '../dashboard.module';
import { CoinMarket } from '../../../core/interfaces/coin-interface';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { TopcryptoService } from '../../../core/services/topcrypto.service';
import { MassageService } from '../../../core/services/massage.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cryptos: CoinMarket[] = [];
  headers: string[] = ['#', 'Name', 'Price', 'Market Cap', '24h %', 'last 7d'];
  isLoading: boolean = true;
  errorMessage: string = '';

  private pollSub?: Subscription;
  private msgSub?: Subscription;
  public searchQuery: string = '';

  constructor(
    private topcrypto: TopcryptoService,
    private messageService: MassageService,
  ) {}

  ngOnInit(): void {
    this.startPolling();

    this.msgSub = this.messageService.message$.subscribe(msg => {
      this.errorMessage = msg;
    });
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
    if (this.cryptos.length > 0) {
        this.errorMessage = '';
      }
  }

  private stopPolling() {
    this.pollSub?.unsubscribe();
  }

  private loadData() {
    if (this.searchQuery.trim().length > 0) {
      return this.topcrypto.searchCoins(this.searchQuery);
    }
    this.isLoading = false;
    return this.topcrypto.getTop10Coins();
  }

  onSearch(query: string) {
    this.isLoading = true;
    this.searchQuery = query;
    this.startPolling();
    this.isLoading = false;
  }

  onClear() {
    this.searchQuery = '';
    this.startPolling();
  }
}
