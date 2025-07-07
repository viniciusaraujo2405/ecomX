class ItemPedido {
    id: string;
    idPedido: string;
    idProduto: string;
    quantidade: number;
  
    constructor(id: string, idPedido: string, idProduto: string, quantidade: number) {
      this.id = id;
      this.idPedido = idPedido;
      this.idProduto = idProduto;
      this.quantidade = quantidade;
    }
  
    calcularSubtotal(precoUnitario: number): number {
      return this.quantidade * precoUnitario;
    }
  }