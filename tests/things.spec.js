const request = require('supertest');
const { app } = require('../src/app');

describe('things', () => {
  describe('GET /things', () => {
    it('should return a 200 status code', async () => {
      const res = await request(app).get('/things');
      expect(res.statusCode).toBe(200);
    });
  });
});
