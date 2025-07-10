"use strict";
class Carrinho {
    constructor(id, idUsuario) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.itens = [];
    }
    adicionarItem(idProduto, quantidade) {
        this.itens.push({ idProduto, quantidade });
    }
    removerItem(idProduto) {
        this.itens = this.itens.filter(item => item.idProduto !== idProduto);
    }
}
