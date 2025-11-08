// client/src/app/core/rules/screener.ts
import type { ScreenResult, Quote } from '../models/stock-dto';

export function screenQuote(q: Quote): ScreenResult {
  let score = 0;
  const reasons: string[] = [];

  if (q.price > q.ema50) { score++; reasons.push('Price above EMA50'); }
  if (q.ema50 > q.ema200) { score++; reasons.push('Trend up: EMA50 > EMA200'); }
  if (q.rsi14 >= 45 && q.rsi14 <= 60) { score++; reasons.push('RSI in 45–60 accumulation'); }

  const signal: ScreenResult['signal'] = score >= 2 ? 'buy' : score === 1 ? 'hold' : 'sell';

  return {
    symbol: q.symbol,
    company: 'Placeholder Inc.',
    signal,
    score,
    explanation: reasons.join('; '),
    ticker: ''
  };
}
