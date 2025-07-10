"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagamentoStatus = exports.metodoPagamento = void 0;
var metodoPagamento;
(function (metodoPagamento) {
    metodoPagamento["CARTAO"] = "CARTAO";
    metodoPagamento["BOLETO"] = "BOLETO";
    metodoPagamento["PIX"] = "PIX";
})(metodoPagamento || (exports.metodoPagamento = metodoPagamento = {}));
var pagamentoStatus;
(function (pagamentoStatus) {
    pagamentoStatus["PENDENTE"] = "PENDENTE";
    pagamentoStatus["APROVADO"] = "APROVADO";
    pagamentoStatus["RECUSADO"] = "RECUSADO";
})(pagamentoStatus || (exports.pagamentoStatus = pagamentoStatus = {}));
class Pagamento {
    constructor(id, metodo, valor, status) {
        this.id = id;
        this.metodo = metodo;
        this.valor = valor;
        this.status = status;
    }
    confirmar() {
        this.status = pagamentoStatus.APROVADO;
    }
}
