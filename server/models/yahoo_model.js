const YahooFinance = require("yahoo-finance2").default;
let yf = null;

//Cache with time to live set
const cache = new Map();
const CACHE_TTL = 60000; 

function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
  // Cleaning any old entries periodically
  if (cache.size > 100) {
    const cutoff = Date.now() - CACHE_TTL;
    for (const [k, v] of cache.entries()) {
      if (v.timestamp < cutoff) cache.delete(k);
    }
  }
}

// Lazy-load Yahoo Finance to avoid startup failures
function getYahooFinance() {
  if (!yf) {
    try {
      yf = new YahooFinance();
    } catch (err) {
      console.error("[yahoo-model] Failed to initialize YahooFinance:", err.message);
      throw err;
    }
  }
  return yf;
}

// quoteSummary: request specific modules (e.g., "price")
async function quoteSummary(symbol, modules = ["price"]) {
  if (!symbol) throw new Error("symbol is required");
  return getYahooFinance().quoteSummary(String(symbol).trim().toUpperCase(), { modules });
}

// quote: quick price / PE fields
async function quote(symbol) {
  if (!symbol) throw new Error("symbol is required");
  const key = `quote:${String(symbol).trim().toUpperCase()}`;
  const cached = getCached(key);
  if (cached) return cached;
  
  const result = await getYahooFinance().quote(String(symbol).trim().toUpperCase(), {
    fields: ["symbol", "regularMarketPrice", "currency", "trailingPE", "forwardPE"],
  });
  setCache(key, result);
  return result;
}

// historical: daily OHLC
async function historical(symbol, { period1, period2, interval = "1d" } = {}) {
  if (!symbol) throw new Error("symbol is required");
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const p1 = period1 || oneYearAgo.toISOString().slice(0, 10);
  const p2 = period2 || now.toISOString().slice(0, 10);
  const key = `historical:${String(symbol).trim().toUpperCase()}:${p1}:${p2}:${interval}`;
  const cached = getCached(key);
  if (cached) return cached;

  const result = await getYahooFinance().historical(String(symbol).trim().toUpperCase(), {
    period1: p1,
    period2: p2,
    //these are '1d' | '1wk' | '1mo'
    interval, 
    events: "history",
  });
  setCache(key, result);
  return result;
}

// search: company/symbol search
async function search(query) {
  if (!query) throw new Error("query is required");
  return getYahooFinance().search(String(query).trim());
}

module.exports = { quoteSummary, quote, historical, search };
