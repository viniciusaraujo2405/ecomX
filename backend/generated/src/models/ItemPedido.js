"use strict";
class ItemPedido {
    constructor(id, idPedido, idProduto, quantidade) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
    calcularSubtotal(precoUnitario) {
        return this.quantidade * precoUnitario;
    }
}
