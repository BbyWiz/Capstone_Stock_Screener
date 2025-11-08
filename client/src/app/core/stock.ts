import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Quote, ScreenResult } from './models/stock-dto';
import { screenQuote } from './rules/screener';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) { }

  getQuote(symbol: string) {
    return this.http.get<Quote>(`/api/quotes/${symbol}`).toPromise();
  }

  async screen(symbol: string): Promise<ScreenResult> {
    const q = await this.getQuote(symbol);
    if (!q) throw new Error('No quote');
    let score = 0;
    const parts: string[] = [];

    if (q.price > q.ema50) {
      score++;
      parts.push('Price above EMA50');
    }
    if (q.ema50 > q.ema200) {
      score++;
      parts.push('EMA50 above EMA200');
    }
    if (q.rsi14 >= 45 && q.rsi14 <= 60) {
      score++;
      parts.push('RSI 45–60');
    }
    

    const signal: ScreenResult['signal'] = score >= 2 ? 'buy' : score === 1 ? 'hold' : 'sell';
     return screenQuote(q);
  }
}
