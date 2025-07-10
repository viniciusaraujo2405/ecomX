"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProdutoRepository {
    /**
     * Cria um novo produto no banco de dados.
     * @param data - Os dados do produto a serem criados.
     */
    async create(data) {
        return prisma.produto.create({ data });
    }
    /**
     * Encontra todos os produtos, opcionalmente filtrando por categoria.
     * Inclui os dados do vendedor (nome) e da categoria.
     * @param idCategoria - Opcional. Filtra produtos por este ID de categoria.
     */
    async findAll(idCategoria) {
        const whereClause = {};
        if (idCategoria) {
            whereClause.idCategoria = idCategoria;
        }
        return prisma.produto.findMany({
            where: whereClause, // Adiciona a cláusula WHERE para filtrar
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
    async findById(id) {
        return prisma.produto.findUnique({
            where: { id },
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
     * Atualiza os dados de um produto existente.
     * @param id - O ID do produto a ser atualizado.
     * @param data - Os novos dados do produto.
     */
    async update(id, data) {
        return prisma.produto.update({
            where: { id },
            data,
        });
    }
    /**
     * Deleta um produto pelo seu ID.
     * @param id - O ID do produto a ser deletado.
     */
    async delete(id) {
        await prisma.produto.delete({ where: { id } });
    }
    /**
     * Encontra todos os produtos de um vendedor específico.
     * Inclui os dados do vendedor (nome) e da categoria.
     * @param idVendedor - O ID do vendedor.
     */
    async findByVendedorId(idVendedor) {
        return prisma.produto.findMany({
            where: { idVendedor: idVendedor },
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
}
exports.ProdutoRepository = ProdutoRepository;
