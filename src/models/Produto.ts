class Produto{
    id: number;
    nome: string;
    descricao: string;
    estoque: number;
    preco: number;
    idLoja: string;
    idCategoria: string;

    constructor(id: number, nome: string, descricao: string, estoque: number, preco: number, idLoja: string, idCategoria: string) { 
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.estoque = estoque;
        this.preco = preco;
        this.idLoja = idLoja;
        this.idCategoria = idCategoria;
    }   

    AdicionarQuantidadeEstoque(quantidade: number): void {
        this.estoque += quantidade;
    }
    ReduzirQuantidadeEstoque(quantidade: number): void {
        if (quantidade > this.estoque) {
            throw new Error("Quantidade insuficiente em estoque.");
        }
        else {
        this.estoque -= quantidade;}
    }
}