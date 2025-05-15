class Carrinho {
    id: string;
    idUsuario: string;
    itens: { idProduto: string; quantidade: number; }[];
  
    constructor(id: string, idUsuario: string) {
      this.id = id;
      this.idUsuario = idUsuario;
      this.itens = [];
    }
  
    adicionarItem(idProduto: string, quantidade: number): void {
      this.itens.push({ idProduto, quantidade });
    }
  
    removerItem(idProduto: string): void {
      this.itens = this.itens.filter(item => item.idProduto !== idProduto);
    }
  }