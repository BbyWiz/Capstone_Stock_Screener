// server/app.test.js
const request = require('supertest');
const app = require('./app');

it('returns a stable shape', async () => {
  const r = await request(app).get('/api/quotes/DIS');
  expect(r.status).toBe(200);
  expect(r.body).toMatchObject({ symbol: 'DIS' });
  expect(typeof r.body.price).toBe('number');
});
