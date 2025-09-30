import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { CoinMarket } from '../interfaces/coin-interface';

@Injectable({
  providedIn: 'root'
})
export class TopcryptoService {

 private marketsUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private searchUrl = 'https://api.coingecko.com/api/v3/search';

  constructor(private http: HttpClient) {}

  getTop10Coins(): Observable<CoinMarket[]> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '10')
      .set('page', '1')
      .set('sparkline', 'true');

    const headers = new HttpHeaders({
      'X-CG-API-KEY': 'CG-zq7cnzBNActdJiALU1F3diPJ',
    });

    return this.http.get<CoinMarket[]>(this.marketsUrl, { params, headers });
  }

   searchCoins(query: string): Observable<CoinMarket[]> {
  if (!query.trim()) {
    // If query is empty, just return the default market data (top coins)
    return this.getTop10Coins();
  }

  const headers = new HttpHeaders({
    'X-CG-API-KEY': 'CG-zq7cnzBNActdJiALU1F3diPJ',
  });

  // Step 1: Search by name (partial allowed)
  return this.http.get<any>(`${this.searchUrl}?query=${query}`, { headers }).pipe(
    switchMap((res) => {
      // Extract coin IDs from search results
      const ids = res.coins.map((c: any) => c.id).slice(0, 50).join(',');
      if (!ids) return of([]); // No results
      // Step 2: Fetch market data for those coins
      const params = new HttpParams()
        .set('vs_currency', 'usd')
        .set('order', 'market_cap_desc')
        .set('per_page', '50')
        .set('page', '1')
        .set('sparkline', 'true')
        .set('ids', ids);

      return this.http.get<CoinMarket[]>(this.marketsUrl, { params, headers });
    })
  );
}

}
