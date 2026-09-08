import request from 'supertest';
import assert from 'assert';
import app from '../src/app.js'; 

describe('Integridad de los Endpoints de la API', () => {
  it('GET /api/services debería responder con un status 200 OK', async () => {
    const response = await request(app).get('/api/services');
    assert.strictEqual(response.status, 200);
  });

  it('GET /api/bookings/id-falso debería responder con un status 404 Not Found', async () => {
    const response = await request(app).get('/api/bookings/id-falso-123');
    assert.strictEqual(response.status, 404);
  });
});