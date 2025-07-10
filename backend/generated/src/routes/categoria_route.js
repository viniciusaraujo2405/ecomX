"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/categoria_route.ts
const express_1 = require("express");
const categoria_controller_1 = require("../controllers/categoria_controller");
const categoriaRouter = (0, express_1.Router)();
const categoriaController = new categoria_controller_1.CategoriaController();
categoriaRouter.get('/', categoriaController.findAll); // Rota pública para listar categorias
exports.default = categoriaRouter;
