export enum metodoPagamento {
    CARTAO = 'CARTAO',
    BOLETO = 'BOLETO',
    PIX = 'PIX'
  }
  
  export enum pagamentoStatus {
    PENDENTE = 'PENDENTE',
    APROVADO = 'APROVADO',
    RECUSADO = 'RECUSADO'
  }

class Pagamento {
    id: string;
    metodo: metodoPagamento;
    valor: number;
    status: pagamentoStatus;
  
    constructor(id: string, metodo: metodoPagamento, valor: number, status: pagamentoStatus) {
      this.id = id;
      this.metodo = metodo;
      this.valor = valor;
      this.status = status;
    }
  
    confirmar(): void {
      this.status = pagamentoStatus.APROVADO;
    }
  }