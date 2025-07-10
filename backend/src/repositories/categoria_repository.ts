// backend/src/repositories/categoria_repository.ts
import { PrismaClient, Categoria } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoriaRepository {
  async findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany();
  }
  // Você pode adicionar create, update, delete para categorias aqui se precisar
}