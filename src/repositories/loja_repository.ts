// src/repositories/loja.repository.ts
import { PrismaClient, Loja } from '@prisma/client';

const prisma = new PrismaClient();

export class LojaRepository {
    async create(data: { nome: string; descricao: string; usuarioId: string }) {
        return prisma.loja.create({
          data: {
            nome: data.nome,
            descricao: data.descricao,
            idLojista: data.usuarioId,
          },
        });
      }

  async findAll() {
    return prisma.loja.findMany({ include: { lojista: true } });
  }

  async findById(id: string) {
    return prisma.loja.findUnique({ where: { id }, include: { lojista: true } });
  }

  async update(id: string, data: Partial<Loja>) {
    return prisma.loja.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.loja.delete({ where: { id } });
  }
}
