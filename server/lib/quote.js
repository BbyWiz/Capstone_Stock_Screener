function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

exports.makeQuote = (symbol) => {
  const base = 80 + (hashCode(symbol) % 120);        // 80..199
  const jitter = (hashCode(symbol + 'x') % 500) / 100; // 0..4.99
  const price = +(base + jitter).toFixed(2);
  const ema50 = +(price * 0.98).toFixed(2);
  const ema200 = +(price * 0.92).toFixed(2);
  const rsi14 = 40 + (hashCode(symbol + 'r') % 30);   // 40..69
  return { symbol, price, ema50, ema200, rsi14 };
};
