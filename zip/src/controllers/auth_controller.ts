import { Request, Response } from 'express';
import { UsuarioRepository } from '../repositories/usuario_repository';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const usuarioRepo = new UsuarioRepository();

export class AuthController {
  async login(req: Request, res: Response) {
    console.log('--- ROTA DE LOGIN INICIADA ---');
    const { email, senha } = req.body;

    if (!email || !senha) {
      console.log('Login falhou: Email ou senha não fornecidos.');
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
      console.log(`Buscando usuário com o email: ${email}`);
      const usuario = await usuarioRepo.findByEmail(email);

      if (!usuario) {
        console.log('Login falhou: Usuário não encontrado no banco de dados.');
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      console.log('Usuário encontrado:', usuario.nome);

      console.log('Verificando a senha...');
      const senhaCorreta = await argon2.verify(usuario.senha, senha);

      if (!senhaCorreta) {
        console.log('Login falhou: A verificação da senha (argon2.verify) retornou false.');
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      console.log('Senha correta!');

      console.log('Gerando o token JWT...');
      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo },
        process.env.JWT_SECRET || 'secretpadrao',
        { expiresIn: '1h' }
      );
      console.log('Token gerado com sucesso. Enviando para o cliente.');
      console.log('--- ROTA DE LOGIN FINALIZADA COM SUCESSO ---');

      return res.json({ token });
    } catch (error) {
      console.error('### ERRO INESPERADO NO LOGIN ###:', error);
      return res.status(500).json({ error: 'Ocorreu um erro interno durante o login.' });
    }
  }
}
