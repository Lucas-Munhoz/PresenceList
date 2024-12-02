const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./src/db/connection');

const loginController = require('./src/controllers/loginController');
const redefinirSenhaController = require('./src/controllers/redefinirSenhaController');
const professorController = require('./src/controllers/professorController');

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

// Rota da tela do workshop
app.get('/workshop', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'views', 'telaWorkshop.html'));
});

// Rotas de cadastro de professores
app.get('/cadastro-professor', professorController.exibirTelaCadastroProfessor);
app.post('/cadastro-professor', professorController.inserirProfessor);
app.get('/listar-professores', professorController.listarProfessores)
app.delete('/deletar-professor', professorController.deletarProfessor);


// Conectar ao banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});

module.exports = app;
