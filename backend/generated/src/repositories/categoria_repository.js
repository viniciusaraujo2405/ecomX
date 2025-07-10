"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
// backend/src/repositories/categoria_repository.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoriaRepository {
    async findAll() {
        return prisma.categoria.findMany();
    }
}
exports.CategoriaRepository = CategoriaRepository;
