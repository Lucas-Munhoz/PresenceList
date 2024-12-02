const path = require('path');
const Professor = require('../models/professor');
const nodemailer = require('nodemailer');

const recoveryCodes = {};


exports.exibirTelaRedefinirSenha = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'views', 'telaRedefinirSenha.html'));
};

exports.enviarCodigo = async (req, res) => {
    const { emailProf } = req.body;

    try{
        const professor = await Professor.findOne({ where: { emailProf } });

        if(!professor){
            return res.status(404).json({ success: false, message: 'E-mail não cadastrado.' });
        }

        const recoveryCode = Math.floor(100000 + Math.random() * 900000);
        recoveryCodes[emailProf] = recoveryCode;

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'delia.carter@ethereal.email',
                pass: 'rHnUj2zREkfWURpzFS'
            }
        });

        const mailOptions = {
            from: 'delia.carter@ethereal.email',
            to: professor.emailProf,
            subject: 'Código de Recuperação de Senha',
            text: `Seu código de recuperação de senha é: ${recoveryCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.error('Erro ao enviar e-mail:', error);
                return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail.' });
            }
            else{
                console.log('E-mail enviado:', info);
                res.status(200).json({ success: true, message: 'Código enviado para o seu e-mail.' });
            }
        });
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao enviar o código de recuperação.' });
    }
};

exports.redefinirSenha = async (req, res) => {
    const { emailProf, recoveryCode, novaSenha } = req.body;

    try{
        if(recoveryCodes[emailProf] !== parseInt(recoveryCode)){
            return res.status(400).json({ success: false, message: 'Código de recuperação inválido.' });
        }

        const professor = await Professor.findOne({ where: { emailProf } });

        if(!professor){
            return res.status(404).json({ success: false, message: 'E-mail não cadastrado.' });
        }

        if(novaSenha.length < 8 || novaSenha.length > 16){
            return res.status(400).json({ success: false, message: 'A senha deve ter entre 8 e 16 caracteres.' });
        }

        professor.senhaProf = novaSenha;
        await professor.save();

        delete recoveryCodes[emailProf];

        res.status(200).json({ success: true, message: 'Senha redefinida com sucesso.' });

    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao redefinir a senha.' });
    }
};
