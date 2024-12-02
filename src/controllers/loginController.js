const path = require('path');
const Professor = require('../models/professor');

exports.exibirTelaLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'views', 'telaLogin.html'));
};

exports.loginProfessor = async (req, res) => {
    try {
        const { emailProf, senhaProf } = req.body;

        if(!emailProf || !senhaProf){
            return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
        }

        const professor = await Professor.findOne({ where: { emailProf } });
        if(!professor) {
            return res.status(400).json({ success: false, message: 'E-mail não cadastrado.' });
        }

        const senhaValida = professor.senhaProf === senhaProf;
        if(!senhaValida) {
            return res.status(400).json({ success: false, message: 'Senha incorreta.' });
        }

        res.status(200).json({ success: true, message: 'Login realizado com sucesso!', redirectTo: '/workshop' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao fazer login.' });
    }
};
