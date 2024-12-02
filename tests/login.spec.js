const request = require('supertest');
const app = require('../app');

describe('Testes para rota de Login', () => {

  test('Deve retornar sucesso no login com credenciais corretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ emailProf: 'test@prof.com', senhaProf: 'senha123' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Deve rejeitar login com credenciais incorretas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ emailProf: 'naoexistente@prof.com', senhaProf: 'senhaerrada' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar tentativa de SQL Injection no login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ emailProf: "test@prof.com", senhaProf: "senha123' OR '1'='1" });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
  
});
