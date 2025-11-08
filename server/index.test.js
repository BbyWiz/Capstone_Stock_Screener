const request = require("supertest");
const app = require("./index");

test("GET /api/quotes/AAPL", async () => {
  const r = await request(app).get("/api/quotes/AAPL");
  expect(r.status).toBe(200);
  expect(r.body).toHaveProperty("symbol", "AAPL");
  expect(typeof r.body.price).toBe("number");
});
