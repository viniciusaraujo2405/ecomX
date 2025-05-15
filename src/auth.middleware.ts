import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // Você pode salvar os dados do usuário na requisição
    req.user = decoded;
    next(); // segue para a próxima etapa (controller ou outro middleware)
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}
