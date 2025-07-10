"use strict";
// Esta classe representa a entidade Produto no seu domínio de negócio.
// Ela foi atualizada para refletir a remoção da entidade 'Loja' e a
// conexão direta com um 'Usuario' (vendedor).
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
class Produto {
    constructor(id, nome, descricao, estoque, preco, idVendedor, // Alterado
    idCategoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.estoque = estoque;
        this.preco = preco;
        this.idVendedor = idVendedor; // Alterado
        this.idCategoria = idCategoria;
    }
    /**
     * Adiciona uma quantidade ao estoque do produto.
     * @param quantidade - O número de itens a serem adicionados.
     */
    AdicionarQuantidadeEstoque(quantidade) {
        if (quantidade < 0) {
            throw new Error('A quantidade não pode ser negativa.');
        }
        this.estoque += quantidade;
    }
    /**
     * Remove uma quantidade do estoque do produto.
     * @param quantidade - O número de itens a serem removidos.
     */
    ReduzirQuantidadeEstoque(quantidade) {
        if (quantidade < 0) {
            throw new Error('A quantidade não pode ser negativa.');
        }
        if (quantidade > this.estoque) {
            throw new Error('Quantidade insuficiente em estoque.');
        }
        this.estoque -= quantidade;
    }
}
exports.Produto = Produto;
