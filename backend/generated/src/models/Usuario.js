"use strict";
var tipoUsuario;
(function (tipoUsuario) {
    tipoUsuario["ADMIN"] = "ADMIN";
    tipoUsuario["CLIENTE"] = "CONSUMIDOR";
    tipoUsuario["VENDEDOR"] = "LOJISTA";
})(tipoUsuario || (tipoUsuario = {}));
class Usuario {
    constructor(id, nome, email, senha, tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }
    autenticar() {
        // Implementar lógica de autenticação
        return true;
    }
}
