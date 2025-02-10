const path = require('path');
const ListaPresenca = require('../models/lista_presenca');
const Aluno = require('../models/alunos');

exports.exibirTelaListaPresenca = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'views', 'telaListaPresenca.html'));
};

exports.listarAlunosPresentes = async (req, res) => {
    try {
        const { idWork } = req.params;
        const idProf = req.headers['idprof'];

        if(!idWork) {
            return res.status(400).json({ success: false, message: 'O ID do workshop é obrigatório!' });
        }

        if(!idProf) {
            return res.status(400).json({ success: false, message: 'ID do professor não encontrado!' });
        }

        const listaPresenca = await ListaPresenca.findAll({
            where: { WORKSHOP_idWork: idWork, WORKSHOP_PROFESSOR_idProf: idProf },
            attributes: ['ALUNOS_raAlun']
        });

        if(listaPresenca.length === 0) {
            return res.status(200).json({ success: true, alunos: [] });
        }

        const rasAlunos = listaPresenca.map(lp => lp.ALUNOS_raAlun);

        const alunos = await Aluno.findAll({
            where: { raAlun: rasAlunos },
            attributes: ['raAlun', 'nomeAlun']
        });

        res.status(200).json({ success: true, alunos });
    }
    catch (error) {
        console.error('Erro ao listar alunos presentes:', error);
        res.status(500).json({ success: false, message: 'Erro ao listar alunos presentes.' });
    }
};

exports.buscarAluno = async (req, res) => {
    try {
        const { raAlun } = req.params;

        if(!raAlun) {
            return res.status(400).json({ message: 'RA do aluno não fornecido!' });
        }

        const aluno = await Aluno.findOne({ where: { raAlun } });

        if(!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado!' });
        }

        res.status(200).json(aluno);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar aluno.' });
    }
};

exports.adicionarAlunoPresenca = async (req, res) => {
    try {
        const { nomeAlun, raAlun } = req.body;
        const idWork = req.params.idWork;
        const idProf = req.headers['idprof'];

        if(!nomeAlun || !raAlun || !idWork || !idProf) {
            return res.status(400).json({ success: false, message: 'Nome do aluno, RA, ID do workshop e ID do professor são obrigatórios!' });
        }

        if(nomeAlun.length > 80) {
            return res.status(400).json({ success: false, message: 'O nome do aluno deve ter no máximo 80 caracteres!' });
        }

        let aluno = await Aluno.findOne({ where: { raAlun } });

        if(!aluno) {
            aluno = await Aluno.create({ raAlun, nomeAlun });
        }

        const alunoJaRegistrado = await ListaPresenca.findOne({
            where: {
                ALUNOS_raAlun: raAlun,
                WORKSHOP_idWork: idWork
            }
        });

        if(alunoJaRegistrado) {
            return res.status(400).json({ success: false, message: 'Aluno já registrado neste workshop!' });
        }

        await ListaPresenca.create({ALUNOS_raAlun: raAlun, WORKSHOP_idWork: idWork, WORKSHOP_PROFESSOR_idProf: idProf});

        res.status(200).json({ success: true, message: 'Aluno adicionado à lista de presença com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao adicionar aluno à lista de presença.' });
    }
};

exports.editarAluno = async (req, res) => {
    try {
        const { nomeAlun } = req.body;
        const { raAlun } = req.params;

        if(!raAlun || !nomeAlun) {
            return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios!' });
        }

        if(nomeAlun.length > 80) {
            return res.status(400).json({ success: false, message: 'O nome do aluno deve ter no máximo 80 caracteres!' });
        }

        const aluno = await Aluno.findOne({ where: { raAlun } });

        if(!aluno) {
            return res.status(404).json({ success: false, message: 'Aluno não encontrado!' });
        }

        await Aluno.update(
            { nomeAlun },
            { where: { raAlun: raAlun } }
        );

        res.status(200).json({ success: true, message: 'Aluno atualizado com sucesso!' });
    }
    catch(error) {
        console.error('Erro ao editar aluno:', error);
        res.status(500).json({ success: false, message: 'Erro ao editar aluno!' });
    }
};


exports.excluirAluno = async (req, res) => {
    try {
        const { raAlun, idWork } = req.params;

        const alunoPresente = await ListaPresenca.findOne({ 
            where: { 
                ALUNOS_raAlun: raAlun,
                WORKSHOP_idWork: idWork
            }
        });

        if(!alunoPresente) {
            return res.status(404).json({ success: false, message: "Aluno não encontrado neste workshop!" });
        }

        await ListaPresenca.destroy({ 
            where: { 
                ALUNOS_raAlun: raAlun,
                WORKSHOP_idWork: idWork
            }
        });

        await Aluno.destroy({
            where: {raAlun: raAlun}
        })

        res.json({ success: true, message: "Aluno removido da lista de presença deste workshop!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao remover aluno da lista de presença." });
    }
};
