import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Esta é a interface que usamos nos controllers para garantir a tipagem
// do usuário que vem do token.
interface UserPayload extends JwtPayload {
  id: string;
  tipo: string;
}

/**
 * Middleware de autorização baseado em tipo de usuário (role).
 * Deve ser usado *depois* do middleware de autenticação (authenticateJWT).
 * @param allowedRoles - Um array de strings com os tipos de usuário permitidos.
 * Ex: authorizeRole(['LOJISTA'])
 */
export const authorizeRole = (allowedRoles: string[]) => {
  // CORREÇÃO: Adicionado o tipo de retorno ': void' para alinhar com o Express.
  return (req: Request, res: Response, next: NextFunction): void => {
    // Assumimos que `authenticateJWT` já colocou o payload do usuário em `req.user`
    const user = req.user as UserPayload;

    // 1. Verifica se o payload do usuário existe
    if (!user) {
      res.status(401).json({ error: 'Usuário não autenticado.' });
      return;
    }

    // 2. Verifica se o tipo do usuário está na lista de tipos permitidos
    if (!user.tipo || !allowedRoles.includes(user.tipo)) {
      // 403 Forbidden: O usuário está logado, mas não tem permissão para acessar este recurso.
      res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
      return;
    }

    // Se passou em todas as verificações, permite que a requisição continue para o controller.
    next();
  };
};
