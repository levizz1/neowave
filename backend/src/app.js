const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar rotas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;