const request = require('supertest');
const app = require('../src/app.js');

describe('Apenas para garantir o funcionamento das ferramentas', () => {
  it('Teste', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
  });
});