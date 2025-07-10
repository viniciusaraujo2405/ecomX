class Endereco {
    id: string;
    idUsuario: string;
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
  
    constructor(id: string, idUsuario: string, rua: string, cidade: string, estado: string, cep: string) {
      this.id = id;
      this.idUsuario = idUsuario;
      this.rua = rua;
      this.cidade = cidade;
      this.estado = estado;
      this.cep = cep;
    }
  }