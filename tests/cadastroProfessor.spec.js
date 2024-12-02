const request = require('supertest');
const app = require('../app');

describe('Testes para rota de Cadastro de Professor', () => {

  const sqlInjection = "' OR 1=1 --";

  //Preparativos para os testes
  beforeAll(async () => {
    //Para teste de e-mail repetido
    await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Teste', emailProf: 'repetido@prof.com', senhaProf: 'senha123' });
  });

  //Tratamento das sobras dos testes
  afterAll(async () => {
    //Email repetido
    await request(app).delete('/deletar-professor').send({ emailProf: 'repetido@prof.com' });

    //Injection no nome
    await request(app).delete('/deletar-professor').send({ emailProf: 'injectionNome@prof.com' });

    //Injection na senha
    await request(app).delete('/deletar-professor').send({ emailProf: 'injectionSenha@prof.com' });
  });



  // POST
  test('Deve cadastrar um novo professor', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Professor Teste', emailProf: 'novo@prof.com', senhaProf: 'senha1234' });
    
    console.log('Resposta do cadastro de novo professor:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Deve rejeitar cadastro com e-mail repetido', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Teste', emailProf: 'repetido@prof.com', senhaProf: 'senha123' });
    
    console.log('Resposta ao tentar cadastrar com e-mail repetido:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar cadastro de nome muito longo', async () => {
    const nomeLongo = 'No meio do caminho tinha uma pedra Tinha uma pedra no meio do caminho Tinha uma pedra No meio do caminho tinha uma pedra Nunca me esquecerei desse acontecimento Na vida de minhas retinas tão fatigadas Nunca me esquecerei que no meio do caminho Tinha uma pedra Tinha uma pedra no meio do caminho No meio do caminho tinha uma pedra.';
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: nomeLongo, emailProf: 'nomelongo@prof.com', senhaProf: 'senha1234' });
    
    console.log('Resposta ao tentar cadastrar com nome muito longo:', response.body);
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar cadastro com e-mail muito longo', async () => {
    const emailLongo = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@prof.com';
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Professor Teste', emailProf: emailLongo, senhaProf: 'senha1234' });
    
    console.log('Resposta ao tentar cadastrar com e-mail muito longo:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar SQL Injection no nome', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: sqlInjection, emailProf: 'injectionNome@prof.com', senhaProf: 'senha1234' });

    console.log('Resposta ao tentar injetar SQL no nome:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar SQL Injection no e-mail', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Professor Teste', emailProf: sqlInjection, senhaProf: 'senha1234' });
    
    console.log('Resposta ao tentar injetar SQL no e-mail:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar SQL Injection na senha', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: 'Professor Teste', emailProf: 'injectionSenha@prof.com', senhaProf: sqlInjection });
    
    console.log('Resposta ao tentar injetar SQL na senha:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Deve rejeitar cadastro com campos em branco', async () => {
    const response = await request(app)
      .post('/cadastro-professor')
      .send({ nomeProf: '', emailProf: '', senhaProf: '' });
    
    console.log('Resposta ao tentar cadastrar com campos em branco:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });



  //DELETE
  test('Deve excluir um professor', async () => {
    const response = await request(app)
      .delete('/deletar-professor')
      .send({ emailProf: 'novo@prof.com' });

    console.log('Resposta ao excluir professor:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Deve falhar ao tentar excluir um professor que não existe', async () => {
    const response = await request(app)
      .delete('/deletar-professor')
      .send({ emailProf: 'naoexiste@prof.com' });

    console.log('Resposta ao tentar excluir professor inexistente:', response.body);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });



  //GET
  test('Deve obter a lista de professores', async () => {
    const response = await request(app)
      .get('/listar-professores');
  
    console.log('Resposta ao obter lista de professores:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.professores)).toBe(true);
    expect(response.body.professores.length).toBeGreaterThan(0);
  });

});

