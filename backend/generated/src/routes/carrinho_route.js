"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/carrinho_route.ts
const express_1 = require("express");
const carrinho_controller_1 = require("../controllers/carrinho_controller"); // Importa o controller do carrinho
const auth_middleware_1 = require("../middlewares/auth_middleware"); // Seu middleware de autenticação
const authorization_middleware_1 = require("../middlewares/authorization_middleware");
const carrinhoRouter = (0, express_1.Router)(); // Crie um novo roteador para o carrinho
const carrinhoController = new carrinho_controller_1.CarrinhoController(); // Instancie o controller
// Todas as rotas do carrinho exigem autenticação
carrinhoRouter.get('/meu', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['CONSUMIDOR']), carrinhoController.getMyCart);
carrinhoRouter.post('/item', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['CONSUMIDOR']), carrinhoController.addItemToCart);
carrinhoRouter.put('/item', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['CONSUMIDOR']), carrinhoController.updateItemQuantityInCart);
carrinhoRouter.delete('/item/:idProduto', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['CONSUMIDOR']), carrinhoController.removeItemFromCart);
carrinhoRouter.delete('/limpar', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['CONSUMIDOR']), carrinhoController.clearMyCart);
exports.default = carrinhoRouter; // Exporta este roteador específico do carrinhoS
