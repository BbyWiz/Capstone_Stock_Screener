export interface StockDto {}

export interface ScreenRequest {
  tickers: string[];
}
export interface ScreenResult {
  ticker: string;
  score: number;
  price?: number;
  notes?: string;
}
export type Signal = 'buy' | 'hold' | 'sell';

export interface Quote {
  symbol: string;
  price: number;
  ema50: number;
  ema200: number;
  rsi14: number;
}

export interface ScreenResult {
  symbol: string;
  company: string;
  signal: Signal;
  score: number;
  explanation: string;
}
