const request = require('supertest');
const app = require('../../app');

describe('Testes para rota de Redefinição de Senha', () => {

  test('Deve enviar um código de recuperação', async () => {
    const response = await request(app)
      .post('/enviar-codigo')
      .send({ emailProf: 'test@prof.com' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Deve falhar ao enviar um código de recuperação para e-mail não cadastrado', async () => {
    const response = await request(app)
      .post('/enviar-codigo')
      .send({ emailProf: 'emailnaocadastrado@prof.com' });
    
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
