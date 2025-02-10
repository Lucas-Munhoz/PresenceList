const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('whatwg-fetch');

describe('Tela de Cadastro de Workshop', () => {
    let dom;
    let document;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, '../../src/public/views/telaWorkshop.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
        document = dom.window.document;

        dom.window.fetch = global.fetch;
    });

    it('Valida se existem campos vazios', () => {
        const form = document.getElementById('formWorkshop');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = '';
        document.getElementById('data').value = '';

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('O nome e a data são obrigatórios!');

        alertMock.mockRestore();
    });

    it('Valida um caso de sucesso no cadastro de workshop', async () => {
        const form = document.getElementById('formWorkshop');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: true, message: 'Workshop cadastrado com sucesso!' }),
        });

        document.getElementById('nome').value = 'Workshop Teste';
        document.getElementById('data').value = '2025-02-10';

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(fetchMock).toHaveBeenCalledWith('/cadastro-workshop', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ nomeWork: 'Workshop Teste', dataWork: '2025-02-10', PROFESSOR_idProf: 1 }),
        }));

        fetchMock.mockRestore();
    });

    it('Valida um caso de falha no cadastro de workshop', async () => {
        const form = document.getElementById('formWorkshop');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({ success: false, message: 'Erro ao cadastrar workshop.' }),
        });

        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.getElementById('nome').value = 'Workshop Teste';
        document.getElementById('data').value = '2025-02-10';

        form.dispatchEvent(new dom.window.Event('submit'));

        await new Promise(process.nextTick);
        expect(alertMock).toHaveBeenCalledWith('Erro ao cadastrar workshop.');

        fetchMock.mockRestore();
        alertMock.mockRestore();
    });
});
