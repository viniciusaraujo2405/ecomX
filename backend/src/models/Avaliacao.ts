class Avaliacao {
    id: string;
    idProduto: string;
    idUsuario: string;
    nota: number;
    comentario: string;
  
    constructor(id: string, idProduto: string, idUsuario: string, nota: number, comentario: string) {
      this.id = id;
      this.idProduto = idProduto;
      this.idUsuario = idUsuario;
      this.nota = nota;
      this.comentario = comentario;
    }
  }