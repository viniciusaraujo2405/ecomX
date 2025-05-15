import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export class UsuarioRepository {
  async create(data: Omit<Usuario, 'id'>) {
    return prisma.usuario.create({ data });
  }

  async findAll() {
    return prisma.usuario.findMany();
  }

  async findById(id: string) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Usuario>) {
    return prisma.usuario.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.usuario.delete({ where: { id } });
  }
}