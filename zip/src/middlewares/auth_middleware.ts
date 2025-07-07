// src/middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret'; // substitua conforme necessário
    const decoded = jwt.verify(token, secret);
    
    // Adiciona o usuário ao request (precisa ter tipagem personalizada se for usar depois)
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
}
