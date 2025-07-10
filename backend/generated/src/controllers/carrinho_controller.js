"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoController = void 0;
const carrinho_repository_1 = require("../repositories/carrinho_repository");
const produto_repository_1 = require("../repositories/produto_repository");
const carrinhoRepo = new carrinho_repository_1.CarrinhoRepository();
const produtoRepo = new produto_repository_1.ProdutoRepository();
class CarrinhoController {
    async getMyCart(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                res.status(401).json({ error: 'Usuário não autenticado.' });
                return;
            }
            // Tipar o retorno para garantir que 'itens' seja reconhecido
            const carrinho = await carrinhoRepo.findOrCreateByUserId(user.id);
            if (!carrinho) { // Adicionar uma verificação caso o findOrCreateByUserId retorne null inesperadamente
                res.status(500).json({ error: 'Não foi possível obter ou criar o carrinho do usuário.' });
                return;
            }
            res.status(200).json(carrinho);
        }
        catch (error) {
            console.error('Erro ao buscar/criar carrinho:', error);
            res.status(500).json({ error: 'Erro interno ao processar o carrinho.' });
        }
    }
    async addItemToCart(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                res.status(401).json({ error: 'Usuário não autenticado.' });
                return;
            }
            const { idProduto, quantidade } = req.body;
            if (!idProduto || !quantidade || quantidade <= 0) {
                res.status(400).json({ error: 'ID do produto e quantidade válida são obrigatórios.' });
                return;
            }
            const carrinho = await carrinhoRepo.findOrCreateByUserId(user.id);
            if (!carrinho) {
                res.status(500).json({ error: 'Não foi possível obter ou criar o carrinho do usuário.' });
                return;
            }
            const produto = await produtoRepo.findById(idProduto);
            if (!produto) {
                res.status(404).json({ error: 'Produto não encontrado.' });
                return;
            }
            if (produto.estoque < quantidade) {
                res.status(400).json({ error: `Estoque insuficiente para o produto: ${produto.nome}. Disponível: ${produto.estoque}` });
                return;
            }
            const carrinhoItem = await carrinhoRepo.addItem(carrinho.id, idProduto, quantidade);
            res.status(200).json(carrinhoItem);
        }
        catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error);
            res.status(500).json({ error: 'Erro interno ao adicionar item ao carrinho.' });
        }
    }
    async updateItemQuantityInCart(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                res.status(401).json({ error: 'Usuário não autenticado.' });
                return;
            }
            const { idProduto, quantidade } = req.body;
            if (!idProduto || quantidade === undefined || quantidade < 0) {
                res.status(400).json({ error: 'ID do produto e nova quantidade são obrigatórios.' });
                return;
            }
            const carrinho = await carrinhoRepo.findOrCreateByUserId(user.id);
            if (!carrinho) {
                res.status(500).json({ error: 'Não foi possível obter o carrinho do usuário.' });
                return;
            }
            if (quantidade === 0) {
                await carrinhoRepo.removeItem(carrinho.id, idProduto);
                res.status(204).send();
                return;
            }
            const produto = await produtoRepo.findById(idProduto);
            if (!produto) {
                res.status(404).json({ error: 'Produto não encontrado.' });
                return;
            }
            const currentItem = carrinho.itens.find(item => item.idProduto === idProduto); // <-- AQUI O ERRO SERÁ RESOLVIDO
            const currentQuantityInCart = currentItem ? currentItem.quantidade : 0;
            if (quantidade > produto.estoque && quantidade > currentQuantityInCart) {
                res.status(400).json({ error: `Estoque insuficiente. Disponível: ${produto.estoque}` });
                return;
            }
            const updatedItem = await carrinhoRepo.updateItemQuantity(carrinho.id, idProduto, quantidade);
            if (updatedItem === null) {
                res.status(404).json({ error: 'Item não encontrado no carrinho para atualização.' });
                return;
            }
            res.status(200).json(updatedItem);
        }
        catch (error) {
            console.error('Erro ao atualizar item do carrinho:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar item do carrinho.' });
        }
    }
    async removeItemFromCart(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                res.status(401).json({ error: 'Usuário não autenticado.' });
                return;
            }
            const { idProduto } = req.params;
            if (!idProduto) {
                res.status(400).json({ error: 'ID do produto é obrigatório.' });
                return;
            }
            const carrinho = await carrinhoRepo.findOrCreateByUserId(user.id);
            if (!carrinho) {
                res.status(500).json({ error: 'Não foi possível obter o carrinho do usuário.' });
                return;
            }
            await carrinhoRepo.removeItem(carrinho.id, idProduto);
            res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
            res.status(500).json({ error: 'Erro interno ao remover item do carrinho.' });
        }
    }
    async clearMyCart(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                res.status(401).json({ error: 'Usuário não autenticado.' });
                return;
            }
            const carrinho = await carrinhoRepo.findOrCreateByUserId(user.id);
            if (!carrinho) {
                res.status(500).json({ error: 'Não foi possível obter o carrinho do usuário.' });
                return;
            }
            await carrinhoRepo.clearCart(carrinho.id);
            res.status(204).send();
        }
        catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            res.status(500).json({ error: 'Erro interno ao limpar o carrinho.' });
        }
    }
}
exports.CarrinhoController = CarrinhoController;
