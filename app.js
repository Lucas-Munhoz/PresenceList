const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./src/db/connection');

const loginController = require('./src/controllers/loginController');
const redefinirSenhaController = require('./src/controllers/redefinirSenhaController');
const professorController = require('./src/controllers/professorController');
const workshopController = require('./src/controllers/workshopController');
const listaPresenca = require('./src/controllers/listaPresencaController')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rotas de login de professores
app.get('/login', loginController.exibirTelaLogin);
app.post('/login', loginController.loginProfessor);

// Rotas para redefinir a senha
app.get('/redefinir-senha', redefinirSenhaController.exibirTelaRedefinirSenha);
app.post('/enviar-codigo', redefinirSenhaController.enviarCodigo);
app.post('/redefinir-senha', redefinirSenhaController.redefinirSenha);

// Rotas de cadastro de professores
app.get('/cadastro-professor', professorController.exibirTelaCadastroProfessor);
app.post('/cadastro-professor', professorController.inserirProfessor);
app.get('/listar-professores', professorController.listarProfessores);
app.delete('/deletar-professor', professorController.deletarProfessor);

// Rotas de workshop
app.get('/workshop', workshopController.exibirTelaWorkshop);
app.get('/listar-workshops/:idProf', workshopController.listarWorkshopsProfessor);
app.get('/buscar-workshop/:idWork', workshopController.buscarWorkshop);
app.post('/cadastro-workshop', workshopController.inserirWorkshop);
app.put('/editar-workshop/:idWork', workshopController.editarWorkshop);
app.delete('/excluir-workshop/:idWork', workshopController.deletarWorkshop);

// Rota das listas de presenca
app.get('/lista-presenca/:idWork', listaPresenca.exibirTelaListaPresenca);
app.get('/listar-alunos-presentes/:idWork', listaPresenca.listarAlunosPresentes);
app.get('/buscar-aluno/:raAlun', listaPresenca.buscarAluno);
app.post('/adicionar-aluno-presenca/:idWork', listaPresenca.adicionarAlunoPresenca);
app.put('/editar-aluno/:raAlun', listaPresenca.editarAluno);
app.delete('/excluir-aluno/:raAlun/:idWork', listaPresenca.excluirAluno);

// Conectar ao banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});

module.exports = app;
