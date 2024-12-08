const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('whatwg-fetch');

describe('Tela de Login do Professor', () => {
    let dom;
    let document;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, '../../src/public/views/telaLogin.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
        document = dom.window.document;

        dom.window.fetch = global.fetch;
    });

    
    it('mostra uma mensagem de erro caso os campos de e-mail e senha estiverem vazios', () => {
        const form = document.getElementById('formLogin');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('E-mail e senha são obrigatórios.');

        alertMock.mockRestore();
    });

    it('Deve enviar os dados corretamente para autenticação', async () => {
        const form = document.getElementById('formLogin');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true, message: 'Login bem-sucedido!', redirectTo: '/dashboard' }),
        });

        document.getElementById('email').value = 'telaLogin@teste.com';
        document.getElementById('password').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(fetchMock).toHaveBeenCalledWith('/login', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailProf: 'telaLogin@teste.com',
                senhaProf: '12345678',
            }),
        }));

        fetchMock.mockRestore();
    });

    it('mostra uma mensagem de erro caso o servidor retornar falha na autenticação', async () => {
        const form = document.getElementById('formLogin');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: false, message: 'Credenciais inválidas.' }),
        });

        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('email').value = 'telaLogin@teste.com';
        document.getElementById('password').value = 'senha_incorreta';

        form.dispatchEvent(new dom.window.Event('submit'));

        await new Promise(process.nextTick);
        expect(alertMock).toHaveBeenCalledWith('Credenciais inválidas.');

        fetchMock.mockRestore();
        alertMock.mockRestore();
    });

    it('mostra uma mensagem de erro em caso de falha na requisição', async () => {
        const form = document.getElementById('formLogin');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockRejectedValue(new Error('Falha na rede'));

        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('email').value = 'telaLogin@teste.com';
        document.getElementById('password').value = '12345678';

        form.dispatchEvent(new dom.window.Event('submit'));

        await new Promise(process.nextTick);
        expect(alertMock).toHaveBeenCalledWith('Erro ao fazer a requisição.');

        fetchMock.mockRestore();
        alertMock.mockRestore();
    });
});
