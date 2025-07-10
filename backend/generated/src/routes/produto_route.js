"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produto_controller_1 = require("../controllers/produto_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const authorization_middleware_1 = require("../middlewares/authorization_middleware");
const router = (0, express_1.Router)();
const controller = new produto_controller_1.ProdutoController();
// --- ROTAS PÚBLICAS ---
// Qualquer pessoa pode listar todos os produtos
router.get('/', (req, res) => controller.findAll(req, res));
// --- ROTAS PROTEGIDAS (Acesso apenas para LOJISTA) ---
// Precisa estar autenticado (token válido) E ter o tipo 'LOJISTA'
router.get('/meus-produtos', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['VENDEDOR']), controller.findMyProducts); // GET /produtos/meus-produtos
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['VENDEDOR']), (req, res) => controller.create(req, res));
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['VENDEDOR']), (req, res) => controller.update(req, res));
router.delete('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.authorizeRole)(['VENDEDOR']), (req, res) => controller.delete(req, res));
exports.default = router;
