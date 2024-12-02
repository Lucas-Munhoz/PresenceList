const path = require('path');
const Professor = require('../models/professor');


exports.exibirTelaCadastroProfessor = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'views', 'telaCadastroProfessor.html'));
};

exports.inserirProfessor = async (req, res) => {
    try {
        const { nomeProf, emailProf, senhaProf } = req.body;

        if(!nomeProf || !emailProf || !senhaProf) {
            return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
        }

        if(nomeProf.length > 80) {
            return res.status(400).json({ success: false, message: 'O nome deve ter no maximo 80 caracteres.' });
        }

        if(emailProf.length > 80) {
            return res.status(400).json({ success: false, message: 'O e-mail deve ter no maximo 80 caracteres.' });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(emailProf)) {
            return res.status(400).json({ success: false, message: 'E-mail inválido. Por favor, insira um e-mail válido.' });
        }

        if(senhaProf.length < 8 || senhaProf.length > 16) {
            return res.status(400).json({ success: false, message: 'A senha deve ter entre 8 e 16 caracteres.' });
        }

        const professorExistente = await Professor.findOne({ where: { emailProf } });
        if(professorExistente) {
            return res.status(400).json({ success: false, message: 'Este e-mail já está cadastrado.' });
        }

        await Professor.create({ nomeProf, emailProf, senhaProf });
        res.status(200).json({ success: true, message: 'Professor registrado com sucesso!' });

    }
    
    catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao registrar professor.' });
    }
};

exports.listarProfessores = async (req, res) => {
    try {
        const professores = await Professor.findAll();
        if(professores.length === 0) {
            return res.status(404).json({ success: false, message: 'Nenhum professor encontrado.' });
        }
        res.status(200).json({ success: true, professores });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao buscar professores.' });
    }
};

exports.deletarProfessor = async (req, res) => {
    try {
        const { emailProf } = req.body;

        if(!emailProf) {
            return res.status(400).json({ success: false, message: 'O e-mail é obrigatório para exclusão.' });
        }

        const professor = await Professor.findOne({ where: { emailProf } });

        if(!professor) {
            return res.status(404).json({ success: false, message: 'E-mail não cadastrado.' });
        }

        const idProf = professor.idProf;
        await Professor.destroy({ where: { idProf: idProf } });

        res.status(200).json({ success: true, message: 'Professor deletado com sucesso.' });
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao deletar o professor.' });
    }
};