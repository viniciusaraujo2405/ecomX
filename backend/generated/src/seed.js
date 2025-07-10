"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Iniciando o processo de seeding...`);
    // --- 1. Limpeza do Banco de Dados ---
    // É uma boa prática limpar os dados para evitar duplicatas a cada execução
    console.log('Limpando dados antigos...');
    // A ordem é importante para evitar erros de restrição de chave estrangeira
    await prisma.notificacao.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.carrinhoItem.deleteMany();
    await prisma.carrinho.deleteMany();
    await prisma.itemPedido.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.pagamento.deleteMany();
    await prisma.endereco.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.usuario.deleteMany();
    console.log('Dados antigos limpos.');
    // --- 2. Criação de Usuários ---
    const senhaLojista = await argon2_1.default.hash('vendedor123');
    const lojista = await prisma.usuario.create({
        data: {
            nome: 'João Vendedor',
            email: 'vendedor@ecomx.com',
            senha: senhaLojista,
            tipo: client_1.tipoUsuario.VENDEDOR,
        },
    });
    const senhaConsumidor = await argon2_1.default.hash('comprador123');
    const consumidor = await prisma.usuario.create({
        data: {
            nome: 'Maria Compradora',
            email: 'comprador@ecomx.com',
            senha: senhaConsumidor,
            tipo: client_1.tipoUsuario.CONSUMIDOR,
        },
    });
    console.log('Usuários LOJISTA e CONSUMIDOR criados.');
    // --- 3. Criação de Categoria ---
    console.log('Criando categorias...');
    const categoriaEletronicos = await prisma.categoria.create({
        data: { nome: 'Eletrônicos', descricao: 'Smartphones, notebooks e gadgets.' },
    });
    const categoriaModa = await prisma.categoria.create({
        data: { nome: 'Moda e Acessórios', descricao: 'Roupas, calçados, bolsas e acessórios.' },
    });
    const categoriaCasa = await prisma.categoria.create({
        data: { nome: 'Casa e Decoração', descricao: 'Móveis, utensílios e itens de decoração.' },
    });
    const categoriaEsportes = await prisma.categoria.create({
        data: { nome: 'Esportes e Lazer', descricao: 'Equipamentos e artigos esportivos.' },
    });
    const categoriaInformatica = await prisma.categoria.create({
        data: { nome: 'Informática', descricao: 'Computadores, periféricos e componentes.' },
    });
    const categoriaBeleza = await prisma.categoria.create({
        data: { nome: 'Beleza e Cuidados Pessoais', descricao: 'Maquiagem, perfumes e higiene.' },
    });
    const categoriaBrinquedos = await prisma.categoria.create({
        data: { nome: 'Brinquedos e Jogos', descricao: 'Brinquedos infantis e jogos de tabuleiro.' },
    });
    console.log('Categorias criadas.');
    // --- 4. Criação de Produto ---
    // O produto agora se conecta diretamente ao 'lojista' (Usuário)
    const produto1 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 1',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaEletronicos.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    const produto2 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 2',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaModa.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    const produto3 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 3',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaCasa.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    const produto4 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 4',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaEsportes.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    const produto5 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 5',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaInformatica.id } },
        },
    });
    const produto6 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 6',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaBeleza.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    const produto7 = await prisma.produto.create({
        data: {
            nome: 'Produto teste 7',
            descricao: 'Celular topo de linha com a melhor câmera',
            estoque: 15,
            preco: 3599.99,
            vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
            categoria: { connect: { id: categoriaBrinquedos.id } },
        },
    });
    console.log('Produto "Smartphone Pro X" criado.');
    // --- 5. Criação de Endereço para o Consumidor ---
    const endereco = await prisma.endereco.create({
        data: {
            rua: 'Rua das Flores, 123',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01234-567',
            usuario: { connect: { id: consumidor.id } }, // Endereço do consumidor
        },
    });
    console.log('Endereço do consumidor criado.');
    // --- 6. Criação de um ciclo de Pedido ---
    const pagamento = await prisma.pagamento.create({
        data: {
            metodo: 'PIX',
            valor: produto1.preco,
            status: 'APROVADO',
        },
    });
    const pedido = await prisma.pedido.create({
        data: {
            consumidor: { connect: { id: consumidor.id } },
            // A conexão com 'loja' foi removida, como planejado
            pagamento: { connect: { id: pagamento.id } },
            endereco: { connect: { id: endereco.id } },
            status: 'PAGO',
        },
    });
    await prisma.itemPedido.create({
        data: {
            pedido: { connect: { id: pedido.id } },
            produto: { connect: { id: produto1.id } },
            quantidade: 1,
        },
    });
    console.log('Ciclo de Pedido criado com sucesso.');
    // --- 7. Criação de um Carrinho com item ---
    const carrinho = await prisma.carrinho.create({
        data: {
            usuario: { connect: { id: consumidor.id } },
        },
    });
    await prisma.carrinhoItem.create({
        data: {
            carrinho: { connect: { id: carrinho.id } },
            produto: { connect: { id: produto1.id } },
            quantidade: 1, // Consumidor deixou 1 item no carrinho
        },
    });
    console.log('Carrinho com item criado.');
    // --- 8. Criação de Avaliação e Notificação ---
    await prisma.avaliacao.create({
        data: {
            produto: { connect: { id: produto1.id } },
            usuario: { connect: { id: consumidor.id } },
            nota: 5,
            comentario: 'Excelente produto, entrega rápida!',
        },
    });
    await prisma.notificacao.create({
        data: {
            usuario: { connect: { id: consumidor.id } },
            mensagem: 'Seu pedido #123 foi enviado!',
            data: new Date(),
            lida: false,
        },
    });
    console.log('Avaliação e Notificação criadas.');
    console.log('Seed executado com sucesso!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
