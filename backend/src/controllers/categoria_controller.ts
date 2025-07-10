// backend/src/controllers/categoria_controller.ts
import { Request, Response } from 'express';
import { CategoriaRepository } from '../repositories/categoria_repository';

const categoriaRepo = new CategoriaRepository();

export class CategoriaController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await categoriaRepo.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ error: 'Erro ao buscar categorias.' });
    }
  }
  // Você pode adicionar create para categorias aqui se precisar
}