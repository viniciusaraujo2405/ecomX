// backend/src/repositories/carrinho_repository.ts
import { PrismaClient, Carrinho, CarrinhoItem, Prisma } from '@prisma/client'; // <-- Adicione 'Prisma' aqui

const prisma = new PrismaClient();

// Defina a interface para o tipo de Carrinho que inclui os itens e o produto dentro dos itens
// Isso garante que o TypeScript saiba que 'itens' existe e o que ele contém
type CarrinhoComItensEProdutos = Prisma.CarrinhoGetPayload<{
  include: {
    itens: {
      include: {
        produto: true;
      };
    };
  };
}>;


export class CarrinhoRepository {

  // Forçar a tipagem do retorno da função para CarrinhoComItensEProdutos | null
  async findOrCreateByUserId(userId: string): Promise<CarrinhoComItensEProdutos | null> {
    let carrinho: CarrinhoComItensEProdutos | null = await prisma.carrinho.findUnique({
      where: { idUsuario: userId },
      include: {
        itens: {
          include: {
            produto: true, // Inclui detalhes do produto no item do carrinho
          },
        },
      },
    });

    if (!carrinho) {
      // Se o carrinho não existe, cria um novo
      carrinho = await prisma.carrinho.create({
        data: {
          idUsuario: userId,
        },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      });
    }
    return carrinho;
  }
  // 2. Adicionar/Atualizar um item no carrinho
  async addItem(idCarrinho: string, idProduto: string, quantidade: number): Promise<CarrinhoItem> {
    // Tenta encontrar o item existente no carrinho
    const existingItem = await prisma.carrinhoItem.findFirst({
      where: {
        idCarrinho: idCarrinho,
        idProduto: idProduto,
      },
    });

    if (existingItem) {
      // Se o item já existe, atualiza a quantidade
      return prisma.carrinhoItem.update({
        where: { id: existingItem.id },
        data: { quantidade: existingItem.quantidade + quantidade },
      });
    } else {
      // Se o item não existe, cria um novo
      return prisma.carrinhoItem.create({
        data: {
          idCarrinho: idCarrinho,
          idProduto: idProduto,
          quantidade: quantidade,
        },
      });
    }
  }

  // 3. Remover um item do carrinho
  async removeItem(idCarrinho: string, idProduto: string): Promise<void> {
    await prisma.carrinhoItem.deleteMany({
      where: {
        idCarrinho: idCarrinho,
        idProduto: idProduto,
      },
    });
  }

  // 4. Atualizar a quantidade de um item específico no carrinho
  async updateItemQuantity(idCarrinho: string, idProduto: string, novaQuantidade: number): Promise<CarrinhoItem | null> {
    if (novaQuantidade <= 0) {
      // Se a nova quantidade for zero ou negativa, remove o item
      await this.removeItem(idCarrinho, idProduto);
      return null;
    }

    const existingItem = await prisma.carrinhoItem.findFirst({
      where: {
        idCarrinho: idCarrinho,
        idProduto: idProduto,
      },
    });

    if (existingItem) {
      return prisma.carrinhoItem.update({
        where: { id: existingItem.id },
        data: { quantidade: novaQuantidade },
      });
    }
    return null; // Item não encontrado para atualização
  }

  // 5. Limpar todo o carrinho
  async clearCart(idCarrinho: string): Promise<void> {
    await prisma.carrinhoItem.deleteMany({
      where: { idCarrinho: idCarrinho },
    });
  }
}