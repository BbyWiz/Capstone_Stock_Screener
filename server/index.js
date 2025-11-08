require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = require("./app");

const express = require("express");
const cors = require("cors");
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

app.use(cors());
app.use(express.json());

app.get("/api/quotes/:symbol", (req, res) => {
  const raw = String(req.params.symbol || "");
  const ok = /^[A-Za-z]{1,5}$/.test(raw);
  if (!ok) return res.status(400).json({ error: "Invalid symbol" });

  const symbol = raw.toUpperCase();
  const price = 100 + Math.random() * 50;
  res.json({
    symbol,
    price,
    ema50: +(price * 0.98).toFixed(2),
    ema200: +(price * 0.92).toFixed(2),
    rsi14: 50,
  });
});
