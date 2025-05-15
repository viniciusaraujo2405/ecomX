// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const senhaCorreta = await argon2.verify(usuario.senha, senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo },
        process.env.JWT_SECRET || 'secretpadrao',
        { expiresIn: '1h' }
      );

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}
