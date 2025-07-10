"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidoStatus = void 0;
var pedidoStatus;
(function (pedidoStatus) {
    pedidoStatus["PENDENTE"] = "PENDENTE";
    pedidoStatus["PAGO"] = "PAGO";
    pedidoStatus["ENVIADO"] = "ENVIADO";
    pedidoStatus["ENTREGUE"] = "ENTREGUE";
    pedidoStatus["CANCELADO"] = "CANCELADO";
})(pedidoStatus || (exports.pedidoStatus = pedidoStatus = {}));
class Pedido {
    constructor(id, idConsumidor, idLoja, idPagamento, idEndereco, status) {
        this.id = id;
        this.idConsumidor = idConsumidor;
        this.idLoja = idLoja;
        this.idPagamento = idPagamento;
        this.idEndereco = idEndereco;
        this.status = status;
    }
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
    }
}
