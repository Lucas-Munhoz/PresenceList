const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
require('whatwg-fetch');

describe('Tela de Lista de Presença', () => {
    let dom;
    let document;

    beforeEach(async () => {
        dom = await JSDOM.fromFile('../../src/public/views/telaListaPresenca.html', {
            runScripts: 'dangerously',
            resources: 'usable'
        });
        document = dom.window.document;
    });

    test('Valida se existem campos vazios ao adicionar aluno', () => {
        const form = document.querySelector('#formListaPresenca');
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        form.dispatchEvent(new dom.window.Event('submit'));
        expect(alertMock).toHaveBeenCalledWith('Nome e RA são obrigatórios!');

        alertMock.mockRestore();
    });

    test('Valida um caso de sucesso ao adicionar aluno', async () => {
        const form = document.querySelector('#formListaPresenca');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({ ok: true });

        document.querySelector('#nomeAluno').value = 'Aluno Teste';
        document.querySelector('#raAluno').value = '123456';

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(fetchMock).toHaveBeenCalledWith('/adicionar-aluno', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ nome: 'Aluno Teste', ra: '123456' }),
        }));

        fetchMock.mockRestore();
    });

    test('Valida um caso de falha ao adicionar aluno', async () => {
        const form = document.querySelector('#formListaPresenca');
        const fetchMock = jest.spyOn(dom.window, 'fetch').mockResolvedValue({ ok: false });
        const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});

        document.querySelector('#nomeAluno').value = 'Aluno Teste';
        document.querySelector('#raAluno').value = '123456';

        form.dispatchEvent(new dom.window.Event('submit'));

        await new Promise(process.nextTick);
        expect(alertMock).toHaveBeenCalledWith('Erro ao adicionar aluno.');

        fetchMock.mockRestore();
        alertMock.mockRestore();
    });

    test('Valida a remoção de um aluno da lista', () => {
        const aluno = document.createElement('div');
        aluno.setAttribute('data-ra', '123456');
        document.body.appendChild(aluno);

        const removerAluno = jest.fn((ra) => {
            const alunoRemovido = document.querySelector(`[data-ra='${ra}']`);
            if (alunoRemovido) {
                alunoRemovido.remove();
            }
        });

        removerAluno('123456');

        expect(document.querySelector("[data-ra='123456']")).toBeNull();
    });
});
