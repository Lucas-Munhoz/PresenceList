const request = require('supertest');
const app = require('../../app.js');

describe('Testes para rota de Workshop', () => {
    const professorId = 1;
    const workshopId = 1;

    test('Deve rejeitar cadastro com nome muito longo', async () => {
        const response = await request(app)
            .post('/cadastro-workshop')
            .send({ nomeWork: 'Nome muito grande para workshop que ultrapassa 20 caracteres', dataWork: '2025-10-10', PROFESSOR_idProf: professorId });
        
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test('Deve listar workshops de um professor', async () => {
        const response = await request(app).get(`/listar-workshops/${professorId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.workshops)).toBe(true);
    });

    test('Deve buscar um workshop pelo ID', async () => {
        const response = await request(app).get(`/buscar-workshop/${workshopId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.idWork).toBe(workshopId);
    });

    test('Deve editar um workshop existente', async () => {
        const response = await request(app)
            .put(`/editar-workshop/${workshopId}`)
            .send({ nomeWork: 'Workshop Atualizado', dataWork: '2026-10-10' });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Deve deletar um workshop', async () => {
        const response = await request(app).delete(`/excluir-workshop/${workshopId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
