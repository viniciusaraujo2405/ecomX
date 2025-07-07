class Notificacao {
    id: string;
    idUsuario: string;
    mensagem: string;
    lida: boolean;
    data: Date;
  
    constructor(id: string, idUsuario: string, mensagem: string, data: Date) {
      this.id = id;
      this.idUsuario = idUsuario;
      this.mensagem = mensagem;
      this.data = data;
      this.lida = false;
    }
  
    marcarComoLida(): void {
      this.lida = true;
    }
  }