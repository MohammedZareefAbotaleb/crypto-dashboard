import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { CoinMarket } from '../interfaces/coin-interface';

@Injectable({
  providedIn: 'root'
})
export class TopcryptoService {

  private marketsUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private searchUrl = 'https://api.coingecko.com/api/v3/search';

  constructor(
    private http: HttpClient,
  ) {}

  getTop10Coins(): Observable<CoinMarket[]> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '10')
      .set('page', '1')
      .set('sparkline', 'true');

    return this.http.get<CoinMarket[]>(this.marketsUrl, { params });
  }

   searchCoins(query: string): Observable<CoinMarket[]> {
  if (!query.trim()) {
    return this.getTop10Coins();
  }
  return this.http.get<any>(`${this.searchUrl}?query=${query}`).pipe(
    switchMap((res) => {
      const ids = res.coins.map((c: any) => c.id).slice(0, 50).join(',');
      if (!ids) return of([]);
      const params = new HttpParams()
        .set('vs_currency', 'usd')
        .set('order', 'market_cap_desc')
        .set('per_page', '50')
        .set('page', '1')
        .set('sparkline', 'true')
        .set('ids', ids);

      return this.http.get<CoinMarket[]>(this.marketsUrl, { params });
    })
  );
}
}
