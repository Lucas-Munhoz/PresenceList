const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('whatwg-fetch');

describe('Tela de Redefinir Senha', () => {
    let dom;
    let document;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, '../../src/public/views/telaRedefinirSenha.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
        document = dom.window.document;

        dom.window.fetch = global.fetch;
    });

    
    it('mostra uma mensagem de erro caso o email não for informado', () => {
        const sendCodeButton = document.getElementById('send-code-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('email').value = '';

        sendCodeButton.click();
        expect(alertMock).toHaveBeenCalledWith('Por favor, insira um e-mail válido.');

        alertMock.mockRestore();
    });

    
    it('mostra uma mensagem de sucesso caso o email for válido', async () => {
        const sendCodeButton = document.getElementById('send-code-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true, message: 'Código enviado!' }),
        });

        document.getElementById('email').value = 'teste@exemplo.com';

        sendCodeButton.click();
        await new Promise(process.nextTick);

        expect(alertMock).toHaveBeenCalledWith('Código de recuperação enviado para o e-mail.');
        expect(document.getElementById('email-section').style.display).toBe('none');
        expect(document.getElementById('reset-section').style.display).toBe('block');

        alertMock.mockRestore();
        fetchMock.mockRestore();
    });


    
    it('mostra uma mensagem de erro caso o servidor não enviar o código', async () => {
        const sendCodeButton = document.getElementById('send-code-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: false, message: 'Erro ao enviar o código.' }),
        });

        document.getElementById('email').value = 'teste@exemplo.com';

        sendCodeButton.click();
        await new Promise(process.nextTick);

        expect(alertMock).toHaveBeenCalledWith('Erro ao enviar o código.');

        alertMock.mockRestore();
        fetchMock.mockRestore();
    });

    
    it('mostra uma mensagem de erro caso tenha algum campo vazio para redefinir a senha', () => {
        const resetPasswordButton = document.getElementById('reset-password-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('codigo').value = '';
        document.getElementById('nova-senha').value = '';

        resetPasswordButton.click();
        expect(alertMock).toHaveBeenCalledWith('Por favor, preencha todos os campos.');

        alertMock.mockRestore();
    });

    
    it('mostra uma mensagem de sucesso caso a senha seja redefinida', async () => {
        const resetPasswordButton = document.getElementById('reset-password-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true }),
        });

        document.getElementById('email').value = 'teste@exemplo.com';
        document.getElementById('codigo').value = '123456';
        document.getElementById('nova-senha').value = 'novaSenha123';

        resetPasswordButton.click();
        await new Promise(process.nextTick);

        expect(alertMock).toHaveBeenCalledWith('Senha redefinida com sucesso!');

        alertMock.mockRestore();
        fetchMock.mockRestore();
    });

    
    it('mostra uma mensagem de erro caso a redefinição de senha falhar no servidor', async () => {
        const resetPasswordButton = document.getElementById('reset-password-btn');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: false, message: 'Erro ao redefinir a senha.' }),
        });

        document.getElementById('email').value = 'teste@exemplo.com';
        document.getElementById('codigo').value = '123456';
        document.getElementById('nova-senha').value = 'novaSenha123';

        resetPasswordButton.click();
        await new Promise(process.nextTick);

        expect(alertMock).toHaveBeenCalledWith('Erro ao redefinir a senha.');

        alertMock.mockRestore();
        fetchMock.mockRestore();
    });
});
