"use strict";
class Notificacao {
    constructor(id, idUsuario, mensagem, data) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.mensagem = mensagem;
        this.data = data;
        this.lida = false;
    }
    marcarComoLida() {
        this.lida = true;
    }
}
