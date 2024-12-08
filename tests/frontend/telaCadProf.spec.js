const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('whatwg-fetch');

describe('Tela de Cadastro de Professor', () => {
    let dom;
    let document;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, '../../src/public/views/telaCadastroProfessor.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
        document = dom.window.document;

        dom.window.fetch = global.fetch;
    });

    it('Valida se existem campos vazios', () => {
        const form = document.getElementById('registerForm');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = 'Teste Tela Cad';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('Todos os campos são obrigatórios.');

        alertMock.mockRestore();
    });

    it('Valida o campo de email', () => {
        const form = document.getElementById('registerForm');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = 'Teste Tela Cad';
        document.getElementById('email').value = 'email_invalido_TELACAD';
        document.getElementById('senha').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('E-mail inválido. Por favor, insira um e-mail válido.');

        alertMock.mockRestore();
    });

    it('Valida o tamanho da senha', () => {
        const form = document.getElementById('registerForm');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = 'Teste Tela Cad';
        document.getElementById('email').value = 'testeTelaCad@teste.com';
        document.getElementById('senha').value = '123';

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('A senha deve ter entre 8 e 16 caracteres.');

        alertMock.mockRestore();
    });

    it('Valida um caso de sucesso', async () => {
        const form = document.getElementById('registerForm');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true, message: 'Cadastro bem-sucedido!' }),
        });

        document.getElementById('nome').value = 'Teste Tela Cad';
        document.getElementById('email').value = 'testeTelaCad@teste.com';
        document.getElementById('senha').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(fetchMock).toHaveBeenCalledWith('/cadastro-professor', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                nomeProf: 'Teste Tela Cad',
                emailProf: 'testeTelaCad@teste.com',
                senhaProf: '12345678',
            }),
        }));

        fetchMock.mockRestore();
    });

    it('Valida um caso de falha do servidor', async () => {
        const form = document.getElementById('registerForm');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: false, message: 'Erro ao cadastrar professor.' }),
        });

        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = 'Teste Tela Cad';
        document.getElementById('email').value = 'testeTelaCad@teste.com';
        document.getElementById('senha').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));

        await new Promise(process.nextTick);
        expect(alertMock).toHaveBeenCalledWith('Erro ao cadastrar professor.');

        fetchMock.mockRestore();
        alertMock.mockRestore();
    });
});
