export enum pedidoStatus {
    PENDENTE = 'PENDENTE',
    PAGO = 'PAGO',
    ENVIADO = 'ENVIADO',
    ENTREGUE = 'ENTREGUE',
    CANCELADO = 'CANCELADO'
  }

class Pedido {
    id: string;
    idConsumidor: string;
    idLoja: string;
    idPagamento: string;
    idEndereco: string;
    status: pedidoStatus;
  
    constructor(id: string, idConsumidor: string, idLoja: string, idPagamento: string, idEndereco: string, status: pedidoStatus) {
      this.id = id;
      this.idConsumidor = idConsumidor;
      this.idLoja = idLoja;
      this.idPagamento = idPagamento;
      this.idEndereco = idEndereco;
      this.status = status;
    }
  
    atualizarStatus(novoStatus: pedidoStatus): void {
      this.status = novoStatus;
    }
  }