import { PrismaClient, Produto } from '@prisma/client';

const prisma = new PrismaClient();

// Define o tipo de dados esperado para criar um produto
// Omitimos 'id' porque o banco de dados o gera automaticamente
type ProdutoCreateData = Omit<Produto, 'id'>;

export class ProdutoRepository {
  /**
   * Cria um novo produto no banco de dados.
   * @param data - Os dados do produto a serem criados.
   */
  async create(data: ProdutoCreateData): Promise<Produto> {
    return prisma.produto.create({ data });
  }

  /**
   * Encontra todos os produtos.
   * Inclui os dados do vendedor (nome) e da categoria.
   */
  async findAll(): Promise<Produto[]> {
    return prisma.produto.findMany({
      include: {
        vendedor: {
          select: {
            nome: true,
          },
        },
        categoria: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  /**
   * Encontra um produto específico pelo seu ID.
   * @param id - O ID do produto.
   */
  async findById(id: string): Promise<Produto | null> {
    return prisma.produto.findUnique({
      where: { id },
      include: {
        vendedor: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  /**
   * Atualiza os dados de um produto existente.
   * @param id - O ID do produto a ser atualizado.
   * @param data - Os novos dados do produto.
   */
  async update(id: string, data: Partial<Produto>): Promise<Produto> {
    return prisma.produto.update({
      where: { id },
      data,
    });
  }

  /**
   * Deleta um produto pelo seu ID.
   * @param id - O ID do produto a ser deletado.
   */
  async delete(id: string): Promise<void> {
    await prisma.produto.delete({ where: { id } });
  }
}
