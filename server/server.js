const path = require("path");
const fs = require("fs");

// Load .env file if it exists
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
} else {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

console.log(`[STARTUP] PORT env var: ${process.env.PORT}`);
console.log(`[STARTUP] Final PORT: ${PORT}`);
console.log(`[STARTUP] NODE_ENV: ${process.env.NODE_ENV}`);

const apiRouter = require("./routes/router");
const openapiPath = path.join(__dirname, "openapi.yaml");

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

// Simple rate limiter to fix server congestions : max 20 requests per minute per IP
const rateLimitMap = new Map();
app.use((req, res, next) => {
  if (req.path.startsWith("/api/yahoo")) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 20;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const requests = rateLimitMap.get(ip).filter(time => now - time < windowMs);
    
    if (requests.length >= maxRequests) {
      return res.status(429).json({ 
        error: "Too many requests. Please wait a moment and try again.",
        retryAfter: Math.ceil((requests[0] + windowMs - now) / 1000)
      });
    }

    requests.push(now);
    rateLimitMap.set(ip, requests);
  }
  next();
});

// routes
app.use("/api", apiRouter);

//health check 
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Log registered routes in development
if (process.env.NODE_ENV !== "production" && app._router && app._router.stack) {
  app._router.stack
    .filter((r) => r.route)
    .forEach((r) => {
      console.log(
        `[ROUTE] ${Object.keys(r.route.methods).join(",")} ${r.route.path}`
      );
    });
}

// Swagger UI
if (fs.existsSync(openapiPath)) {
  const swaggerUi = require("swagger-ui-express");
  const YAML = require("yamljs");
  const swaggerDocument = YAML.load(openapiPath);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
}

// Angular static + SPA routes (Docker-friendly, supports both dist/ and dist/client/)
const clientDistRoot = path.join(__dirname, "..", "client", "dist");
let clientDistPath = clientDistRoot;

if (fs.existsSync(path.join(clientDistRoot, "client", "index.html"))) {
  clientDistPath = path.join(clientDistRoot, "client");
} else if (fs.existsSync(path.join(clientDistRoot, "index.html"))) {
  clientDistPath = clientDistRoot;
}

if (fs.existsSync(path.join(clientDistPath, "index.html"))) {
  app.use(express.static(clientDistPath));

  const spaRoutes = ["/login", "/dashboard", "/documentation", "/docs-client"];

  app.get(spaRoutes, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });

  // Catch-all route: serve index.html for any unmatched routes  
  app.use((req, res, next) => {
    // Don't redirect /api or /docs calls to index.html anymore
    if (!req.path.startsWith("/api") && !req.path.startsWith("/docs")) {
      res.sendFile(path.join(clientDistPath, "index.html"));
    } else {
      next();
    }
  });
}

app.get("/", (req, res) => {
  if (fs.existsSync(openapiPath)) return res.redirect("/docs");
  return res.json({
    name: "Express Swagger Starter",
    health: "/api/health",
    docs: "/docs",
  });
});

app.use((req, res) => res.status(404).json({ error: "Not Found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});
//PLenty of console logs for troubleshooting Docker deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on 0.0.0.0:${PORT}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV || "development"}`);
  console.log(`Client dist path: ${fs.existsSync(path.join(__dirname, "..", "client", "dist")) ? "✓ Found" : "✗ Not found"}`);
  if (fs.existsSync(openapiPath))
    console.log(`Swagger UI on http://localhost:${PORT}/docs`);
});

module.exports = app;
