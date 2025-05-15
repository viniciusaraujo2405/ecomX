import { Request, Response } from 'express';
import { UsuarioRepository } from '../repositories/usuario_repository';

const usuarioRepo = new UsuarioRepository();

export class UsuarioController {
  async create(req: Request, res: Response) {
    try {
      const usuario = await usuarioRepo.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar usuário', details: error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioRepo.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const usuario = await usuarioRepo.findById(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário', details: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const usuario = await usuarioRepo.update(req.params.id, req.body);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar usuário', details: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await usuarioRepo.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar usuário', details: error });
    }
  }
}
