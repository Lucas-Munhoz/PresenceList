const request = require('supertest');
const app = require('../../app.js');

describe('Testes para a rota de lista de presença', () => {
    const idWork = 1;
    const idProf = 123;
    const raAlun = 456;
    const nomeAlun = "Aluno Teste";

    test('Deve listar alunos presentes em um workshop', async () => {
        const response = await request(app)
            .get(`/listar-alunos-presentes/${idWork}`)
            .set('idprof', idProf);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('alunos');
        expect(Array.isArray(response.body.alunos)).toBe(true);
    });

    test('Deve retornar erro ao listar alunos sem ID do professor', async () => {
        const response = await request(app)
            .get(`/listar-alunos-presentes/${idWork}`);
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('success', false);
    });

    test('Deve buscar um aluno pelo RA', async () => {
        const response = await request(app).get(`/buscar-aluno/${raAlun}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('raAlun', raAlun);
    });

    test('Deve adicionar um aluno à lista de presença', async () => {
        const response = await request(app)
            .post(`/adicionar-aluno-presenca/${idWork}`)
            .set('idprof', idProf)
            .send({ nomeAlun, raAlun });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });

    test('Deve impedir adicionar um aluno duplicado', async () => {
        await request(app)
            .post(`/adicionar-aluno-presenca/${idWork}`)
            .set('idprof', idProf)
            .send({ nomeAlun, raAlun });

        const response = await request(app)
            .post(`/adicionar-aluno-presenca/${idWork}`)
            .set('idprof', idProf)
            .send({ nomeAlun, raAlun });
        
        expect(response.status).toBe(400);
    });

    test('Deve editar o nome de um aluno', async () => {
        const novoNome = "Aluno Atualizado";
        const response = await request(app)
            .put(`/editar-aluno/${raAlun}`)
            .send({ nomeAlun: novoNome });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });

    test('Deve excluir um aluno da lista de presença', async () => {
        const response = await request(app)
            .delete(`/excluir-aluno/${raAlun}/${idWork}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });
});
