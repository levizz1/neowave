const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.register = (req, res) => {
    const { nome, cpf, telefone, data_nascimento, senha } = req.body;

    const hashedPassword = bcrypt.hashSync(senha, 8);

    const sql = 'INSERT INTO usuarios (nome, cpf, telefone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [nome, cpf, telefone, data_nascimento, hashedPassword], (err, result) => {
        if (err) {
            console.error('Erro no cadastro:', err);
            return res.status(500).json({ message: 'Erro no cadastro' });
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    });
};

exports.login = (req, res) => {
    const { cpf, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE cpf = ?';
    db.query(sql, [cpf], (err, results) => {
        if (err) {
            console.error('Erro no login:', err);
            return res.status(500).json({ message: 'Erro no login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'CPF ou senha incorretos' });
        }

        const user = results[0];

        const senhaValida = bcrypt.compareSync(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: 'CPF ou senha incorretos' });
        }

        const token = jwt.sign(
            { id: user.id, nome: user.nome },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login bem-sucedido',
            token
        });
    });
};