// client/src/app/core/rules/screener.spec.ts
import { screenQuote } from './screener';

describe('screenQuote', () => {
  it('scores and signals', () => {
    const r = screenQuote({ symbol: 'TEST', price: 100, ema50: 95, ema200: 90, rsi14: 50 });
    expect(r.signal).toBe('buy');
    expect(r.score).toBeGreaterThanOrEqual(2);
  });
});
