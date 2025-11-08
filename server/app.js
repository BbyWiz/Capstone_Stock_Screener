// server/app.js
const express = require("express");
const cors = require("cors");
const { makeQuote } = require("./lib/quote");
const app = express();
const path = require("path");
const dist = path.resolve(__dirname, "../client/dist");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());
const limiter = rateLimit({ windowMs: 60_000, max: 120 });
app.use("/api/", limiter);

if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(cors());
}

// app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(morgan("tiny"));
app.use(express.static(dist));
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.get("/api/quotes/:symbol", (req, res) => {
  const raw = String(req.params.symbol || "");
  if (!/^[A-Za-z]{1,5}$/.test(raw))
    return res.status(400).json({ error: "Invalid symbol" });
  const symbol = raw.toUpperCase();
  return res.json(makeQuote(symbol));
});

module.exports = app;
