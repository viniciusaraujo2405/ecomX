// Esta classe representa a entidade Produto no seu domínio de negócio.
// Ela foi atualizada para refletir a remoção da entidade 'Loja' e a
// conexão direta com um 'Usuario' (vendedor).

export class Produto {
  id: string; // Alterado de number para string para alinhar com o UUID do Prisma
  nome: string;
  descricao: string;
  estoque: number;
  preco: number;
  idVendedor: string; // Alterado de idLoja para idVendedor
  idCategoria: string;

  constructor(
    id: string,
    nome: string,
    descricao: string,
    estoque: number,
    preco: number,
    idVendedor: string, // Alterado
    idCategoria: string
  ) {
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
  AdicionarQuantidadeEstoque(quantidade: number): void {
    if (quantidade < 0) {
      throw new Error('A quantidade não pode ser negativa.');
    }
    this.estoque += quantidade;
  }

  /**
   * Remove uma quantidade do estoque do produto.
   * @param quantidade - O número de itens a serem removidos.
   */
  ReduzirQuantidadeEstoque(quantidade: number): void {
    if (quantidade < 0) {
      throw new Error('A quantidade não pode ser negativa.');
    }
    if (quantidade > this.estoque) {
      throw new Error('Quantidade insuficiente em estoque.');
    }
    this.estoque -= quantidade;
  }
}
