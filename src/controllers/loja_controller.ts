import { Request, Response } from 'express';
import { LojaRepository } from '../repositories/loja_repository';

const lojaRepo = new LojaRepository();

export class LojaController {
  async create(req: Request, res: Response) {
    try {
      const loja = await lojaRepo.create(req.body);
      res.status(201).json(loja);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar loja', details: error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const lojas = await lojaRepo.findAll();
      res.json(lojas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar lojas', details: error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const loja = await lojaRepo.findById(req.params.id);
      if (!loja) return res.status(404).json({ error: 'Loja não encontrada' });
      res.json(loja);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar loja', details: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const loja = await lojaRepo.update(req.params.id, req.body);
      res.json(loja);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar loja', details: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await lojaRepo.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar loja', details: error });
    }
  }
}
