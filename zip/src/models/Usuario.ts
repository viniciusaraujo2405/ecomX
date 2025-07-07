enum tipoUsuario{
    ADMIN = 'ADMIN',
    CLIENTE = 'CONSUMIDOR',
    VENDEDOR = 'LOJISTA'
}

class Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    tipo: tipoUsuario;

    constructor(id: string, nome: string, email: string, senha: string, tipo: tipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }

    autenticar() : boolean {
        // Implementar lógica de autenticação
        return true;
    }
}