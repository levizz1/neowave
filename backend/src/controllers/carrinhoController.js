const db = require('../config/db');

// Listar itens do carrinho de um usuário
exports.listarCarrinho = (req, res) => {
    const { usuarioId } = req.params;

    const query = `
        SELECT ci.id, p.nome, p.preco, ci.quantidade
        FROM carrinho_itens ci
        JOIN produtos p ON ci.produto_id = p.id
        JOIN carrinho c ON ci.carrinho_id = c.id
        WHERE c.usuario_id = ?;
    `;

    db.query(query, [usuarioId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar o carrinho' });
        res.json(results);
    });
};

// Adicionar item ao carrinho
exports.adicionarItem = (req, res) => {
    const { usuarioId, produtoId, quantidade } = req.body;

    // Verifica se o usuário já tem um carrinho
    const findCarrinho = `SELECT id FROM carrinho WHERE usuario_id = ?`;

    db.query(findCarrinho, [usuarioId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao verificar carrinho' });

        let carrinhoId;

        if (results.length > 0) {
            carrinhoId = results[0].id;
            inserirItem();
        } else {
            // Cria novo carrinho
            const createCarrinho = `INSERT INTO carrinho (usuario_id) VALUES (?)`;
            db.query(createCarrinho, [usuarioId], (err, result) => {
                if (err) return res.status(500).json({ error: 'Erro ao criar carrinho' });
                carrinhoId = result.insertId;
                inserirItem();
            });
        }

        function inserirItem() {
            const insertItem = `
                INSERT INTO carrinho_itens (carrinho_id, produto_id, quantidade)
                VALUES (?, ?, ?)
            `;
            db.query(insertItem, [carrinhoId, produtoId, quantidade], (err) => {
                if (err) return res.status(500).json({ error: 'Erro ao adicionar item' });
                res.json({ message: 'Item adicionado ao carrinho!' });
            });
        }
    });
};

// Atualizar quantidade de item
exports.atualizarQuantidade = (req, res) => {
    const { itemId } = req.params;
    const { quantidade } = req.body;

    const update = `
        UPDATE carrinho_itens SET quantidade = ?
        WHERE id = ?
    `;

    db.query(update, [quantidade, itemId], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar item' });
        res.json({ message: 'Quantidade atualizada!' });
    });
};

// Remover item específico
exports.removerItem = (req, res) => {
    const { itemId } = req.params;

    const del = `DELETE FROM carrinho_itens WHERE id = ?`;

    db.query(del, [itemId], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao remover item' });
        res.json({ message: 'Item removido do carrinho!' });
    });
};

// Limpar carrinho
exports.limparCarrinho = (req, res) => {
    const { usuarioId } = req.params;

    const getCarrinho = `SELECT id FROM carrinho WHERE usuario_id = ?`;

    db.query(getCarrinho, [usuarioId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar carrinho' });
        if (results.length === 0) return res.status(404).json({ message: 'Carrinho não encontrado' });

        const carrinhoId = results[0].id;

        const delItens = `DELETE FROM carrinho_itens WHERE carrinho_id = ?`;

        db.query(delItens, [carrinhoId], (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao limpar carrinho' });
            res.json({ message: 'Carrinho limpo com sucesso!' });
        });
    });
};