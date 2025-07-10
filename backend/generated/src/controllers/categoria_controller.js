"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const categoria_repository_1 = require("../repositories/categoria_repository");
const categoriaRepo = new categoria_repository_1.CategoriaRepository();
class CategoriaController {
    async findAll(req, res) {
        try {
            const categorias = await categoriaRepo.findAll();
            res.status(200).json(categorias);
        }
        catch (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({ error: 'Erro ao buscar categorias.' });
        }
    }
}
exports.CategoriaController = CategoriaController;
