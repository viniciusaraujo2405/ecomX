import { PrismaClient, Usuario } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();

export class UsuarioRepository {
  async create(data: Omit<Usuario, 'id'>) {
    const senhaHasheada = await argon2.hash(data.senha);
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

  async findById(id: string) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  // NOVO MÉTODO ADICIONADO AQUI
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<Usuario>) {
    return prisma.usuario.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.usuario.delete({ where: { id } });
  }
}
