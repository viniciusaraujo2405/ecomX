"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const client_1 = require("@prisma/client");
const usuario_repository_1 = require("../repositories/usuario_repository");
const usuarioRepo = new usuario_repository_1.UsuarioRepository();
class UsuarioController {
    async create(req, res) {
        try {
            const usuario = await usuarioRepo.create(req.body);
            // --- TESTE DE DEPURAÇÃO DEFINITIVO ---
            // Vamos enviar a resposta da forma mais manual e à prova de falhas possível.
            // Isso bypassa qualquer "mágica" do método res.json() que possa estar causando o problema.
            const responsePayload = JSON.stringify({
                message: 'Usuário criado com sucesso!',
                userId: usuario.id
            });
            res.setHeader('Content-Type', 'application/json');
            res.status(201).send(responsePayload);
            // Explicitamente retornamos para garantir que nada mais seja executado depois disto.
            return;
        }
        catch (error) {
            // Esta parte, que já funciona, permanece a mesma.
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(409).json({ error: 'Este e-mail já está em uso.' });
                }
            }
            console.error('Erro detalhado ao criar usuário:', error);
            res.status(500).json({ error: 'Ocorreu um erro inesperado ao criar o usuário.' });
        }
    }
    // ... o resto dos seus métodos ...
    async getMyProfile(req, res) {
        try {
            const userId = req.user.id;
            const usuario = await usuarioRepo.findById(userId);
            if (!usuario) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
            const { senha, ...usuarioSemSenha } = usuario;
            res.json(usuarioSemSenha);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perfil' });
        }
    }
    async findAll(req, res) {
        // ...
    }
    async update(req, res) {
        // ...
    }
    async delete(req, res) {
        // ...
    }
}
exports.UsuarioController = UsuarioController;
