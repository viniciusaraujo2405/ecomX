import { PrismaClient, tipoUsuario } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

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
  const senhaLojista = await argon2.hash('vendedor123');
  const lojista = await prisma.usuario.create({
    data: {
      nome: 'João Vendedor',
      email: 'vendedor@ecomx.com',
      senha: senhaLojista,
      tipo: tipoUsuario.LOJISTA,
    },
  });

  const senhaConsumidor = await argon2.hash('comprador123');
  const consumidor = await prisma.usuario.create({
    data: {
      nome: 'Maria Compradora',
      email: 'comprador@ecomx.com',
      senha: senhaConsumidor,
      tipo: tipoUsuario.CONSUMIDOR,
    },
  });
  console.log('Usuários LOJISTA e CONSUMIDOR criados.');

  // --- 3. Criação de Categoria ---
  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
      descricao: 'Dispositivos eletrônicos em geral',
    },
  });
  console.log('Categoria "Eletrônicos" criada.');

  // --- 4. Criação de Produto ---
  // O produto agora se conecta diretamente ao 'lojista' (Usuário)
  const produto = await prisma.produto.create({
    data: {
      nome: 'Smartphone Pro X',
      descricao: 'Celular topo de linha com a melhor câmera',
      estoque: 15,
      preco: 3599.99,
      vendedor: { connect: { id: lojista.id } }, // Conexão direta com o usuário vendedor
      categoria: { connect: { id: categoria.id } },
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
      valor: produto.preco,
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
      produto: { connect: { id: produto.id } },
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
      produto: { connect: { id: produto.id } },
      quantidade: 1, // Consumidor deixou 1 item no carrinho
    },
  });
  console.log('Carrinho com item criado.');

  // --- 8. Criação de Avaliação e Notificação ---
  await prisma.avaliacao.create({
    data: {
      produto: { connect: { id: produto.id } },
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
