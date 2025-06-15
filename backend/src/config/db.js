const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

module.exports = db;