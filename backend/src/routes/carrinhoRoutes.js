const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

// Listar itens do carrinho
router.get('/:usuarioId', carrinhoController.listarCarrinho);

// Adicionar item ao carrinho
router.post('/adicionar', carrinhoController.adicionarItem);

// Atualizar quantidade de um item no carrinho
router.put('/atualizar/:itemId', carrinhoController.atualizarQuantidade);

// Remover item específico do carrinho
router.delete('/remover/:itemId', carrinhoController.removerItem);

// Limpar todo o carrinho do usuário
router.delete('/limpar/:usuarioId', carrinhoController.limparCarrinho);

module.exports = router;