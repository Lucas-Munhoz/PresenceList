const path = require('path');
const Workshop = require('../models/workshop');
const Professor = require('../models/professor');
const ListaPresenca = require('../models/lista_presenca');

exports.exibirTelaWorkshop = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'views', 'telaWorkshop.html'));
};

exports.inserirWorkshop = async (req, res) => {
    try {
        const { nomeWork, dataWork, PROFESSOR_idProf } = req.body;

        if(!nomeWork || !dataWork || !PROFESSOR_idProf) {
            return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
        }

        if(nomeWork.length > 20) {
            return res.status(400).json({ success: false, message: 'O nome deve ter no maximo 20 caracteres.' });
        }

        const professorExistente = await Professor.findOne({ where: { idProf: PROFESSOR_idProf } });
        if(!professorExistente) {
            return res.status(400).json({ success: false, message: 'Professor não cadastrado!' });
        }

        await Workshop.create({ nomeWork, dataWork, PROFESSOR_idProf });
        res.status(200).json({ success: true, message: 'Workshop registrado com sucesso!' });

    }
    
    catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao registrar workshop.' });
    }
};

exports.listarWorkshopsProfessor = async (req, res) => {
    try {
        const { idProf } = req.params;

        if(!idProf) {
            return res.status(400).json({ success: false, message: 'ID do professor não fornecido!' });
        }

        const workshops = await Workshop.findAll({where:{PROFESSOR_idProf: idProf}});
        if(workshops.length === 0) {
            return res.status(404).json({ success: false, message: 'Este professor não possui workshops registrados!' });
        }
        res.status(200).json({ success: true, workshops });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao buscar workshops.' });
    }
};

exports.buscarWorkshop = async (req, res) => {
    try {
        const { idWork } = req.params;
        
        if(!idWork) {
            return res.status(400).json({ message: 'ID do workshop não fornecido!' });
        }

        const workshop = await Workshop.findOne({ where: { idWork } });

        if(!workshop) {
            return res.status(404).json({ message: 'Workshop não encontrado!' });
        }

        res.status(200).json(workshop);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar workshop.' });
    }
};

exports.editarWorkshop = async (req, res) => {
    try {
        const { idWork } = req.params;
        const { nomeWork, dataWork } = req.body;

        if(!idWork || !nomeWork || !dataWork) {
            return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios!' });
        }

        if(nomeWork.length > 20) {
            return res.status(400).json({ success: false, message: 'O nome do workshop deve ter no máximo 20 caracteres!' });
        }

        const dataPattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if(!dataPattern.test(dataWork)) {
            return res.status(400).json({ success: false, message: 'A data deve estar no formato dd/mm/aaaa!' });
        }

        const workshop = await Workshop.findOne({ where: { idWork } });

        if (!workshop) {
            return res.status(404).json({ success: false, message: 'Workshop não encontrado!' });
        }

        await Workshop.update(
            { nomeWork, dataWork },
            { where: { idWork: idWork } }
        );

        res.status(200).json({ success: true, message: 'Workshop atualizado com sucesso!' });
    }
    catch(error) {
        console.error('Erro ao editar workshop:', error);
        res.status(500).json({ success: false, message: 'Erro ao editar workshop!' });
    }
};


exports.deletarWorkshop = async (req, res) => {
    try {
        const { idWork } = req.params;

        if(!idWork) {
            return res.status(400).json({ success: false, message: 'O id do workshop é obrigatório para exclusão!' });
        }

        const workshop = await Workshop.findOne({ where: { idWork } });

        if(!workshop) {
            return res.status(404).json({ success: false, message: 'Workshop não encontrado!' });
        }

        await ListaPresenca.destroy({ where: { WORKSHOP_idWork: idWork } });
        await Workshop.destroy({ where: { idWork } });
        res.status(200).json({ success: true, message: 'Workshop deletado com sucesso!' });

    }
    catch(error) {
        console.error('Erro ao deletar workshop: ', error);
        res.status(500).json({ success: false, message: 'Erro ao deletar o workshop!' });
    }
};
