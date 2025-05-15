class Loja {
    id: string;
    nome: string;
    descricao: string;
    idLojista: string;

    constructor(id: string, nome: string, descricao: string, idLojista: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.idLojista = idLojista;
    }
}