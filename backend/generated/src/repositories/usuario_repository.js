"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
class UsuarioRepository {
    async create(data) {
        const senhaHasheada = await argon2_1.default.hash(data.senha);
        return prisma.usuario.create({
            data: {
                ...data,
                senha: senhaHasheada,
            },
        });
    }
    async findAll() {
        return prisma.usuario.findMany();
    }
    async findById(id) {
        return prisma.usuario.findUnique({ where: { id } });
    }
    // NOVO MÉTODO ADICIONADO AQUI
    async findByEmail(email) {
        return prisma.usuario.findUnique({ where: { email } });
    }
    async update(id, data) {
        return prisma.usuario.update({ where: { id }, data });
    }
    async delete(id) {
        return prisma.usuario.delete({ where: { id } });
    }
}
exports.UsuarioRepository = UsuarioRepository;
